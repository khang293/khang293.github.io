// Máy đánh cờ caro mức "Siêu khó" (/game/caro/). Xóa game caro thì xóa luôn file này.
// Gồm: chấm điểm theo cửa sổ 5 ô (cập nhật từng nước), tìm kiếm negamax + alpha-beta,
// tìm sâu dần theo thời gian, bảng băm Zobrist, và tìm chuỗi ép thắng VCF (chỉ đi các nước tạo "4").
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

export function insaneMove(board: Int8Array, me: number, ms = 1500, N = 15): number {
  const NN = N * N;
  const { WINS, cellW, NW } = getTables(N);
  const c = [new Int8Array(NW), new Int8Array(NW), new Int8Array(NW)]; // c[1], c[2]: số quân từng bên trong mỗi cửa sổ
  const nb = new Int8Array(NN); // số quân nằm trong vòng 2 ô quanh mỗi ô
  const bd = new Int8Array(NN);
  let total = 0, h1 = 0, h2 = 0, stones = 0;
  const contrib = (a: number, b: number) => (b === 0 ? S[a] : a === 0 ? -S[b] : 0);
  function place(i: number, p: number) {
    for (const w of cellW[i]) {
      const a = c[1][w], b = c[2][w];
      total -= contrib(a, b);
      c[p][w]++;
      total += contrib(c[1][w], c[2][w]);
    }
    bd[i] = p; stones++;
    h1 ^= Z1[p][i]; h2 ^= Z2[p][i];
    const r = (i / N) | 0, cc = i % N;
    for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) { const rr = r + dr, c2 = cc + dc; if (rr >= 0 && rr < N && c2 >= 0 && c2 < N) nb[rr * N + c2]++; }
  }
  function unplace(i: number) {
    const p = bd[i];
    for (const w of cellW[i]) {
      const a = c[1][w], b = c[2][w];
      total -= contrib(a, b);
      c[p][w]--;
      total += contrib(c[1][w], c[2][w]);
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
    const q = 3 - p;
    for (let w = 0; w < NW; w++) {
      if (c[p][w] === 4 && c[q][w] === 0) {
        const e = emptyOf(w);
        if (out[0] < 0) out[0] = e; else if (out[0] !== e) { out[1] = e; return; }
      }
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
  function gen(p: number, k: number): number[] {
    const arr: { i: number; s: number }[] = [];
    for (let i = 0; i < NN; i++) if (!bd[i] && nb[i] > 0) arr.push({ i, s: heur(i, p) });
    arr.sort((x, y) => y.s - x.s);
    return arr.slice(0, k).map((x) => x.i);
  }

  const deadline = Date.now() + ms;
  let nodes = 0, aborted = false;
  const tt = new Map<number, TT>();
  const key = () => (h1 >>> 0) * 2097152 + (h2 & 0x1fffff);
  const wc = [-1, -1];

  // ---------- Tìm chuỗi ép thắng: chỉ đi các nước tạo "4", đối thủ buộc phải chặn ----------
  let vNodes = 0;
  function vcf(att: number, d: number): number {
    if (d <= 0 || ++vNodes > 30000) return -1;
    const def = 3 - att;
    winCells(att, wc);
    if (wc[0] >= 0) return wc[0];
    winCells(def, wc);
    if (wc[0] >= 0) return -1; // đối thủ đã có đòn thắng, không còn là chuỗi ép
    const cand = new Set<number>();
    for (let w = 0; w < NW; w++) if (c[att][w] === 3 && c[def][w] === 0) for (const x of WINS[w]) if (!bd[x]) cand.add(x);
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
    if (depth <= 0) return p === 1 ? total : -total;
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
    if (ow[0] >= 0) moves = [ow[0]]; // bắt buộc chặn
    else {
      moves = gen(p, ply === 0 ? 16 : ply < 3 ? 10 : 7);
      if (ttMove >= 0 && !bd[ttMove]) { const ix = moves.indexOf(ttMove); if (ix > 0) { moves.splice(ix, 1); moves.unshift(ttMove); } else if (ix < 0) moves.unshift(ttMove); }
    }
    if (!moves.length) return 0;
    const a0 = alpha;
    let best = -Infinity, bm = moves[0];
    for (const m of moves) {
      place(m, p);
      const v = -negamax(depth - 1, ply + 1, -beta, -alpha, q);
      unplace(m);
      if (aborted) return 0;
      if (v > best) { best = v; bm = m; }
      if (v > alpha) alpha = v;
      if (alpha >= beta) break;
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

  const mine = vcf(me, 14);
  if (mine >= 0) return mine;

  let rootMoves = gen(me, 18);
  // Nếu đối thủ sắp có chuỗi ép thắng thì chỉ chọn các nước làm chuỗi đó thất bại
  vNodes = 0;
  if (vcf(foe, 12) >= 0) {
    const safe: number[] = [];
    const wide = gen(me, 30);
    for (const m of wide) {
      place(m, me);
      vNodes = 0;
      const stillLosing = vcf(foe, 12) >= 0;
      unplace(m);
      if (!stillLosing) safe.push(m);
    }
    if (safe.length) rootMoves = safe;
  }

  let bestMove = rootMoves[0];
  for (let depth = 2; depth <= 12; depth += 1) {
    let bm = -1, bv = -Infinity, alpha = -Infinity;
    const order = rootMoves.slice();
    const ix = order.indexOf(bestMove);
    if (ix > 0) { order.splice(ix, 1); order.unshift(bestMove); }
    for (const m of order) {
      place(m, me);
      const v = -negamax(depth - 1, 1, -Infinity, -alpha, foe);
      unplace(m);
      if (aborted) break;
      if (v > bv) { bv = v; bm = m; }
      if (v > alpha) alpha = v;
    }
    if (aborted) break;
    if (bm >= 0) bestMove = bm;
    if (bv >= WIN - 50) break; // đã thấy đường thắng
    if (Date.now() > deadline - ms * 0.35) break; // không đủ thời gian cho tầng sâu hơn
  }
  return bestMove;
}
