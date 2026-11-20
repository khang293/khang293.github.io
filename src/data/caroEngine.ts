// Máy đánh cờ caro mức "Siêu khó" và "Siêu khủng khiếp" (/game/caro/). Xóa game caro thì xóa luôn file này.
// Gồm: chấm điểm theo cửa sổ 5 ô (cập nhật từng nước), tìm kiếm negamax + alpha-beta,
// tìm sâu dần theo thời gian, bảng băm Zobrist, sắp xếp nước theo killer và lịch sử,
// cắt giảm độ sâu cho nước kém (LMR), và tìm chuỗi ép thắng VCF (chỉ đi các nước tạo "4").
const WIN = 1e8;
const S = [0, 1, 10, 100, 1500, 0]; // điểm một cửa sổ 5 ô có k quân cùng màu và không có quân đối thủ

// ---------- Tất cả cửa sổ 5 ô liền nhau theo 4 hướng, tính một lần cho mỗi cỡ bàn ----------
type Tables = { WINS: number[][]; cellW: number[][]; NW: number };
const tableCache = new Map<number, Tables>();
function getTables(N: number): Tables {
  const hit = tableCache.get(N);
  if (hit) return hit;
  const WINS: number[][] = [];
  const cellW: number[][] = Array.from({ length: N * N }, () => []);
  for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      const er = r + 4 * dr, ec = c + 4 * dc;
      if (er < 0 || er >= N || ec < 0 || ec >= N) continue;
      const w: number[] = [];
      for (let k = 0; k < 5; k++) w.push((r + k * dr) * N + c + k * dc);
      const id = WINS.length;
      WINS.push(w);
      for (const x of w) cellW[x].push(id);
    }
  }
  const t = { WINS, cellW, NW: WINS.length };
  tableCache.set(N, t);
  return t;
}

// ---------- Mã băm Zobrist (đủ cho bàn tới 32×32) ----------
const MAXC = 32 * 32;
let seed = 123456789;
const rnd32 = () => { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return seed | 0; };
const Z1 = [new Int32Array(MAXC), new Int32Array(MAXC), new Int32Array(MAXC)];
const Z2 = [new Int32Array(MAXC), new Int32Array(MAXC), new Int32Array(MAXC)];
for (let p = 1; p <= 2; p++) for (let i = 0; i < MAXC; i++) { Z1[p][i] = rnd32(); Z2[p][i] = rnd32(); }

type TT = { d: number; v: number; f: number; m: number };
type Cfg = {
  K: number[];        // số nước xét ở gốc / tầng gần gốc / tầng sâu
  vcfD: number;       // độ sâu tìm chuỗi ép thắng cho mình
  vcfOppD: number;    // độ sâu tìm chuỗi ép thắng của đối thủ để phòng
  vcfNodes: number;   // giới hạn số nút cho mỗi lần tìm VCF
  maxD: number;       // độ sâu tối đa của tìm kiếm
  lmr: boolean;       // cắt giảm độ sâu cho các nước xếp sau
  leafVcf: number;    // độ sâu VCF ngắn ở lá để thấy thế thắng ngay sau đường cắt
  safeWide: number;   // số nước thử khi cần phá chuỗi ép thắng của đối thủ
  tempo: number;      // điểm thưởng cho bên đang tới lượt khi có đường 3
  qd: number;         // độ sâu tìm yên tĩnh (chỉ đi các nước tạo 4) ở lá
  vctD: number;       // độ sâu tìm chuỗi ép thắng có cả "ba mở" (VCT), 0 = tắt
  vctNodes: number;   // giới hạn số nút cho VCT
};
const CFG_INSANE: Cfg = { K: [16, 10, 7], vcfD: 14, vcfOppD: 12, vcfNodes: 30000, maxD: 12, lmr: false, leafVcf: 0, safeWide: 30, tempo: 0, qd: 0, vctD: 0, vctNodes: 0 };
// Thử nghiệm cho thấy LMR, quét VCF ở lá và nới rộng số nước không giúp mạnh hơn (đấu ngang hoặc yếu hơn mức Siêu khó ở cùng thời gian),
// còn thêm thời gian suy nghĩ thì có. Nên mức này giữ cấu hình của Siêu khó, nghĩ lâu hơn và tìm chuỗi ép thắng sâu hơn.
const CFG_ULTRA: Cfg = { K: [16, 10, 7], vcfD: 20, vcfOppD: 16, vcfNodes: 80000, maxD: 24, lmr: false, leafVcf: 0, safeWide: 30, tempo: 0, qd: 0, vctD: 0, vctNodes: 0 }; // VCT thử nghiệm thua Siêu khó (7-13, 8-12 trên 20 ván) nên đang tắt

export const insaneMove = (board: Int8Array, me: number, ms = 1500, N = 15) => solve(board, me, ms, N, CFG_INSANE);
export const ultraMove = (board: Int8Array, me: number, ms = 4500, N = 15) => solve(board, me, ms, N, CFG_ULTRA);

function solve(board: Int8Array, me: number, ms: number, N: number, cfg: Cfg): number {
  const NN = N * N;
  const { WINS, cellW, NW } = getTables(N);
  const c = [new Int8Array(NW), new Int8Array(NW), new Int8Array(NW)]; // c[1], c[2]: số quân từng bên trong mỗi cửa sổ
  // Tập các cửa sổ đang có 4 quân (thắng được ngay) và 3 quân của mỗi bên, để khỏi quét hết mọi cửa sổ ở mỗi nút
  const four: Set<number>[] = [new Set(), new Set(), new Set()];
  const three: Set<number>[] = [new Set(), new Set(), new Set()];
  const nb = new Int8Array(NN); // số quân nằm trong vòng 2 ô quanh mỗi ô
  const bd = new Int8Array(NN);
  let total = 0, h1 = 0, h2 = 0, stones = 0;
  const contrib = (a: number, b: number) => (b === 0 ? S[a] : a === 0 ? -S[b] : 0);
  function upd(w: number) {
    const a = c[1][w], b = c[2][w];
    if (a === 4 && b === 0) four[1].add(w); else four[1].delete(w);
    if (b === 4 && a === 0) four[2].add(w); else four[2].delete(w);
    if (a === 3 && b === 0) three[1].add(w); else three[1].delete(w);
    if (b === 3 && a === 0) three[2].add(w); else three[2].delete(w);
  }
  function place(i: number, p: number) {
    for (const w of cellW[i]) {
      total -= contrib(c[1][w], c[2][w]);
      c[p][w]++;
      total += contrib(c[1][w], c[2][w]);
      upd(w);
    }
    bd[i] = p; stones++;
    h1 ^= Z1[p][i]; h2 ^= Z2[p][i];
    const r = (i / N) | 0, cc = i % N;
    for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) { const rr = r + dr, c2 = cc + dc; if (rr >= 0 && rr < N && c2 >= 0 && c2 < N) nb[rr * N + c2]++; }
  }
  function unplace(i: number) {
    const p = bd[i];
    for (const w of cellW[i]) {
      total -= contrib(c[1][w], c[2][w]);
      c[p][w]--;
      total += contrib(c[1][w], c[2][w]);
      upd(w);
    }
    bd[i] = 0; stones--;
    h1 ^= Z1[p][i]; h2 ^= Z2[p][i];
    const r = (i / N) | 0, cc = i % N;
    for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) { const rr = r + dr, c2 = cc + dc; if (rr >= 0 && rr < N && c2 >= 0 && c2 < N) nb[rr * N + c2]--; }
  }
  for (let i = 0; i < NN; i++) if (board[i]) place(i, board[i]);

  const emptyOf = (w: number) => { for (const x of WINS[w]) if (!bd[x]) return x; return -1; };
  // Các ô hoàn thành 5 quân ngay của bên p (tối đa 2 ô khác nhau)
  function winCells(p: number, out: number[]) {
    out[0] = -1; out[1] = -1;
    for (const w of four[p]) {
      const e = emptyOf(w);
      if (out[0] < 0) out[0] = e; else if (out[0] !== e) { out[1] = e; return; }
    }
  }
  // Điểm ưu tiên của một ô cho bên p (tấn công + chặn), dùng để sắp xếp nước đi
  function heur(i: number, p: number) {
    const q = 3 - p;
    let s = 0;
    for (const w of cellW[i]) {
      const a = c[p][w], b = c[q][w];
      if (b === 0) { s += a === 4 ? 1e6 : S[a + 1] - S[a]; }
      if (a === 0) { s += b === 4 ? 5e5 : (S[b + 1] - S[b]) * 1.05; }
    }
    return s;
  }
  const hist = [new Int32Array(NN), new Int32Array(NN), new Int32Array(NN)];
  const killers: number[][] = Array.from({ length: 64 }, () => [-1, -1]);
  function gen(p: number, k: number, ply: number): number[] {
    const arr: { i: number; s: number }[] = [];
    const kl = killers[ply];
    for (let i = 0; i < NN; i++) if (!bd[i] && nb[i] > 0) arr.push({ i, s: heur(i, p) });
    arr.sort((x, y) => y.s - x.s);
    // Chọn k nước theo điểm chiến thuật (không để lịch sử đẩy nước quan trọng ra ngoài), rồi mới sắp lại thứ tự thử
    const top = arr.slice(0, k);
    for (const x of top) x.s += Math.min(hist[p][x.i], 300) + (x.i === kl[0] ? 400 : x.i === kl[1] ? 200 : 0);
    top.sort((x, y) => y.s - x.s);
    return top.map((x) => x.i);
  }

  const deadline = Date.now() + ms;
  let nodes = 0, aborted = false;
  const tt = new Map<number, TT>();
  const key = () => (h1 >>> 0) * 2097152 + (h2 & 0x1fffff);
  const wc = [-1, -1];

  // ---------- Tìm chuỗi ép thắng: chỉ đi các nước tạo "4", đối thủ buộc phải chặn ----------
  let vNodes = 0, vCap = cfg.vcfNodes;
  function vcf(att: number, d: number): number {
    if (d <= 0 || ++vNodes > vCap) return -1;
    if ((vNodes & 255) === 0 && Date.now() > deadline) { vNodes = vCap + 1; return -1; }
    const def = 3 - att;
    winCells(att, wc);
    if (wc[0] >= 0) return wc[0];
    winCells(def, wc);
    if (wc[0] >= 0) return -1; // đối thủ đã có đòn thắng, không còn là chuỗi ép
    const cand = new Set<number>();
    for (const w of three[att]) for (const x of WINS[w]) if (!bd[x]) cand.add(x);
    const list = [...cand].sort((x, y) => heur(y, att) - heur(x, att));
    for (const m of list) {
      place(m, att);
      const r: number[] = [-1, -1];
      winCells(att, r);
      if (r[1] >= 0) { // hai đường 4 cùng lúc, không chặn hết được
        winCells(def, wc);
        const defWins = wc[0] >= 0;
        unplace(m);
        if (!defWins) return m;
        continue;
      }
      if (r[0] >= 0) {
        const blk = r[0];
        winCells(def, wc);
        if (wc[0] >= 0) { unplace(m); continue; } // đối thủ thắng trước
        place(blk, def);
        let defFive = false;
        for (const w of cellW[blk]) if (c[def][w] === 5) { defFive = true; break; }
        let res = -1;
        if (!defFive) res = vcf(att, d - 1);
        unplace(blk); unplace(m);
        if (res >= 0) return m;
      } else unplace(m);
      if (vNodes > vCap) return -1;
    }
    return -1;
  }

  const leafEval = (p: number) => (p === 1 ? total : -total) + (cfg.tempo ? cfg.tempo * Math.min(three[p].size, 4) : 0);
  // Tìm yên tĩnh: ở lá chỉ đi tiếp các nước tạo "4" (và nước chặn bắt buộc) để không bị ảo giác ở đường cắt
  function qs(p: number, ply: number, alpha: number, beta: number, d: number): number {
    if ((++nodes & 255) === 0 && Date.now() > deadline) aborted = true;
    if (aborted) return 0;
    const q = 3 - p;
    winCells(p, wc);
    if (wc[0] >= 0) return WIN - ply;
    const ow = [-1, -1];
    winCells(q, ow);
    if (ow[1] >= 0) return -(WIN - ply - 1);
    if (ow[0] >= 0) {
      place(ow[0], p);
      const v = -qs(q, ply + 1, -beta, -alpha, d);
      unplace(ow[0]);
      return v;
    }
    let best = leafEval(p);
    if (d <= 0 || best >= beta) return best;
    if (best > alpha) alpha = best;
    const cand = new Set<number>();
    for (const w of three[p]) for (const x of WINS[w]) if (!bd[x]) cand.add(x);
    const list = [...cand].sort((x, y) => heur(y, p) - heur(x, p)).slice(0, 6);
    for (const m of list) {
      place(m, p);
      const v = -qs(q, ply + 1, -beta, -alpha, d - 1);
      unplace(m);
      if (aborted) return 0;
      if (v > best) best = v;
      if (v > alpha) alpha = v;
      if (alpha >= beta) break;
    }
    return best;
  }

  // ---------- VCT: chuỗi ép thắng gồm cả nước tạo "4" lẫn "ba mở" ----------
  // Bên tấn công đi nước tạo đe dọa, bên thủ phải đỡ; thắng khi MỌI cách đỡ đều thua.
  let tNodes = 0, tCap = cfg.vctNodes;
  function defenceCells(att: number, m: number): number[] {
    // các ô bên thủ có thể đỡ "ba mở" vừa tạo: mọi ô trống trong các cửa sổ cùng đường có >= 2 quân tấn công
    const def = 3 - att, set = new Set<number>();
    for (const w of cellW[m]) {
      if (c[att][w] >= 3 && c[def][w] === 0) {
        for (const x of WINS[w]) if (!bd[x]) set.add(x);
        for (const x of WINS[w]) if (bd[x] === att) for (const w2 of cellW[x]) if (c[att][w2] >= 2 && c[def][w2] === 0) for (const y of WINS[w2]) if (!bd[y]) set.add(y);
      }
    }
    return [...set];
  }
  function vct(att: number, d: number): number {
    if (d <= 0 || ++tNodes > tCap) return -1;
    if ((tNodes & 255) === 0 && Date.now() > deadline) { tNodes = tCap + 1; return -1; }
    const def = 3 - att;
    winCells(att, wc);
    if (wc[0] >= 0) return wc[0];
    winCells(def, wc);
    if (wc[0] >= 0) return -1;
    const fours = new Set<number>(), threes = new Set<number>();
    for (const w of three[att]) for (const x of WINS[w]) if (!bd[x]) fours.add(x);
    if (d >= 2) for (let i = 0; i < NN; i++) {
      if (bd[i] || nb[i] === 0 || fours.has(i)) continue;
      for (const w of cellW[i]) if (c[att][w] === 2 && c[def][w] === 0) { threes.add(i); break; }
    }
    const lf = [...fours].sort((x, y) => heur(y, att) - heur(x, att));
    const lt = [...threes].sort((x, y) => heur(y, att) - heur(x, att)).slice(0, 8);
    for (const m of lf.concat(lt)) {
      place(m, att);
      const r: number[] = [-1, -1];
      winCells(att, r);
      let win = false;
      if (r[1] >= 0) { winCells(def, wc); win = wc[0] < 0; }
      else if (r[0] >= 0) {
        winCells(def, wc);
        if (wc[0] < 0) {
          const blk = r[0];
          place(blk, def);
          let defFive = false;
          for (const w of cellW[blk]) if (c[def][w] === 5) { defFive = true; break; }
          if (!defFive) win = vct(att, d - 1) >= 0;
          unplace(blk);
        }
      } else if (!fours.has(m)) {
        // m tạo "ba": có mở không? (đặt thêm một quân mà tạo hai chỗ thắng)
        let live = false;
        for (const w of cellW[m]) {
          if (c[att][w] !== 3 || c[def][w] !== 0) continue;
          for (const e of WINS[w]) { if (bd[e]) continue; place(e, att); const q: number[] = [-1, -1]; winCells(att, q); unplace(e); if (q[1] >= 0) { live = true; break; } }
          if (live) break;
        }
        if (live) {
          winCells(def, wc);
          if (wc[0] < 0) {
            const reps = defenceCells(att, m);
            for (const x of three[def]) for (const y of WINS[x]) if (!bd[y]) reps.push(y);
            const uniq = [...new Set(reps)];
            if (uniq.length && uniq.length <= 14) {
              win = true;
              for (const dm of uniq) {
                place(dm, def);
                const ok = vct(att, d - 1) >= 0;
                unplace(dm);
                if (!ok) { win = false; break; }
              }
            }
          }
        }
      }
      unplace(m);
      if (win) return m;
      if (tNodes > tCap) return -1;
    }
    return -1;
  }

  // ---------- Negamax với cắt tỉa alpha-beta ----------
  function negamax(depth: number, ply: number, alpha: number, beta: number, p: number): number {
    if ((++nodes & 255) === 0 && Date.now() > deadline) aborted = true;
    if (aborted) return 0;
    const q = 3 - p;
    winCells(p, wc);
    if (wc[0] >= 0) return WIN - ply;
    const ow = [-1, -1];
    winCells(q, ow);
    if (ow[1] >= 0) return -(WIN - ply - 1); // đối thủ có hai chỗ thắng, không chặn hết được
    if (depth <= 0) {
      if (cfg.leafVcf && ow[0] < 0) { // ở lá, thử xem bên đi có chuỗi ép thắng ngắn không
        const sv = vNodes, sc = vCap;
        vNodes = 0; vCap = 400;
        const r = vcf(p, cfg.leafVcf);
        vNodes = sv; vCap = sc;
        if (r >= 0) return WIN - ply - 2;
      }
      if (cfg.qd) return qs(p, ply, alpha, beta, cfg.qd);
      return leafEval(p);
    }
    const k = key();
    const e = tt.get(k);
    let ttMove = -1;
    if (e) {
      ttMove = e.m;
      if (e.d >= depth) {
        if (e.f === 0) return e.v;
        if (e.f === 1 && e.v > alpha) alpha = e.v;
        else if (e.f === 2 && e.v < beta) beta = e.v;
        if (alpha >= beta) return e.v;
      }
    }
    let moves: number[];
    const forced = ow[0] >= 0;
    if (forced) moves = [ow[0]]; // bắt buộc chặn
    else {
      moves = gen(p, ply === 0 ? cfg.K[0] : ply < 3 ? cfg.K[1] : cfg.K[2], Math.min(ply, 63));
      if (ttMove >= 0 && !bd[ttMove]) { const ix = moves.indexOf(ttMove); if (ix > 0) { moves.splice(ix, 1); moves.unshift(ttMove); } else if (ix < 0) moves.unshift(ttMove); }
    }
    if (!moves.length) return 0;
    const a0 = alpha;
    let best = -Infinity, bm = moves[0];
    for (let idx = 0; idx < moves.length; idx++) {
      const m = moves[idx];
      place(m, p);
      let v: number;
      if (cfg.lmr && !forced && idx >= 4 && depth >= 3 && alpha > -1e9) {
        v = -negamax(depth - 2, ply + 1, -alpha - 1, -alpha, q);
        if (v > alpha && !aborted) v = -negamax(depth - 1, ply + 1, -beta, -alpha, q);
      } else v = -negamax(depth - 1, ply + 1, -beta, -alpha, q);
      unplace(m);
      if (aborted) return 0;
      if (v > best) { best = v; bm = m; }
      if (v > alpha) alpha = v;
      if (alpha >= beta) {
        const kl = killers[Math.min(ply, 63)];
        if (kl[0] !== m) { kl[1] = kl[0]; kl[0] = m; }
        hist[p][m] += depth * depth;
        break;
      }
    }
    tt.set(k, { d: depth, v: best, f: best <= a0 ? 2 : best >= beta ? 1 : 0, m: bm });
    return best;
  }

  // ---------- Chọn nước ở gốc ----------
  if (stones === 0) return (N >> 1) * N + (N >> 1);
  if (stones === 1) { // đáp bên cạnh quân đầu tiên theo đường chéo
    const f = bd.findIndex((x) => x > 0);
    const r = (f / N) | 0, cc = f % N;
    const dr = r > N / 2 ? -1 : 1, dc = cc > N / 2 ? -1 : 1;
    return (r + dr) * N + (cc + dc);
  }
  const rw = [-1, -1];
  winCells(me, rw);
  if (rw[0] >= 0) return rw[0];
  const foe = 3 - me;
  const fw = [-1, -1];
  winCells(foe, fw);
  if (fw[0] >= 0) return fw[0]; // phải chặn (nếu có hai chỗ thì đành chặn một chỗ)

  vNodes = 0; vCap = cfg.vcfNodes;
  const mine = vcf(me, cfg.vcfD);
  if (mine >= 0) return mine;
  if (cfg.vctD) { tNodes = 0; tCap = cfg.vctNodes; const tm = vct(me, cfg.vctD); if (tm >= 0) return tm; }

  let rootMoves = gen(me, cfg.K[0], 0);
  // Nếu đối thủ sắp có chuỗi ép thắng thì chỉ chọn các nước làm chuỗi đó thất bại
  vNodes = 0; vCap = cfg.vcfNodes;
  if (vcf(foe, cfg.vcfOppD) >= 0) {
    const safe: number[] = [];
    const wide = gen(me, cfg.safeWide, 0);
    for (const m of wide) {
      if (Date.now() > deadline) break;
      place(m, me);
      vNodes = 0; vCap = Math.max(5000, (cfg.vcfNodes / 4) | 0);
      const stillLosing = vcf(foe, cfg.vcfOppD) >= 0;
      unplace(m);
      if (!stillLosing) safe.push(m);
    }
    if (safe.length) rootMoves = safe;
  }

  let bestMove = rootMoves[0];
  let order = rootMoves.slice();
  for (let depth = 2; depth <= cfg.maxD; depth += 1) {
    let bm = -1, bv = -Infinity, alpha = -Infinity;
    const ix = order.indexOf(bestMove);
    if (ix > 0) { order.splice(ix, 1); order.unshift(bestMove); }
    const scored: { m: number; v: number }[] = [];
    for (const m of order) {
      place(m, me);
      const v = -negamax(depth - 1, 1, -Infinity, -alpha, foe);
      unplace(m);
      if (aborted) break;
      scored.push({ m, v });
      if (v > bv) { bv = v; bm = m; }
      if (v > alpha) alpha = v;
    }
    if (aborted) break;
    if (bm >= 0) bestMove = bm;
    if (bv >= WIN - 50) break; // đã thấy đường thắng
    if (bv <= -(WIN - 50) && depth >= 4) break; // thua chắc, không tìm thêm
    // Nước tốt ở tầng này lên đầu cho tầng sau (giữ phần còn lại theo thứ tự cũ)
    scored.sort((x, y) => y.v - x.v);
    order = scored.map((s) => s.m).concat(order.filter((m) => !scored.some((s) => s.m === m)));
    if (Date.now() > deadline - ms * 0.3) break; // không đủ thời gian cho tầng sâu hơn
  }
  return bestMove;
}
