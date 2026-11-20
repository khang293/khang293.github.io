// Luật và máy đánh cờ tướng (/game/xiangqi/). Xóa game cờ tướng thì xóa luôn file này cùng xiangqiWorker.ts.
// Bàn 9 cột × 10 hàng, ô = hàng*9 + cột, hàng 0 ở trên cùng (phe Đen), hàng 9 ở dưới cùng (phe Đỏ, đi trước).
// Quân: 1 Tướng, 2 Sĩ, 3 Tượng, 4 Mã, 5 Xe, 6 Pháo, 7 Tốt. Số dương = Đỏ, số âm = Đen.
// Nước đi mã hóa thành một số: from << 7 | to.
export const W = 9, H = 10;

export function startBoard(): Int8Array {
  const b = new Int8Array(90);
  const back = [5, 4, 3, 2, 1, 2, 3, 4, 5];
  for (let c = 0; c < 9; c++) { b[c] = -back[c]; b[81 + c] = back[c]; }
  b[2 * 9 + 1] = b[2 * 9 + 7] = -6;
  b[7 * 9 + 1] = b[7 * 9 + 7] = 6;
  for (let c = 0; c < 9; c += 2) { b[3 * 9 + c] = -7; b[6 * 9 + c] = 7; }
  return b;
}

export const mvFrom = (m: number) => m >> 7;
export const mvTo = (m: number) => m & 127;
const enc = (f: number, t: number) => (f << 7) | t;

const inPalace = (r: number, c: number, s: number) => c >= 3 && c <= 5 && (s > 0 ? r >= 7 && r <= 9 : r >= 0 && r <= 2);
const KN: number[][] = [[-2, -1, -1, 0], [-2, 1, -1, 0], [2, -1, 1, 0], [2, 1, 1, 0], [-1, -2, 0, -1], [1, -2, 0, -1], [-1, 2, 0, 1], [1, 2, 0, 1]];
const ORTH = [[-1, 0], [1, 0], [0, -1], [0, 1]];

// Mọi nước đi theo luật di chuyển (chưa kiểm tra tự để lộ tướng). capsOnly = chỉ các nước ăn quân.
export function genMoves(b: Int8Array, s: number, out: number[], capsOnly = false) {
  for (let sq = 0; sq < 90; sq++) {
    const p = b[sq] * s;
    if (p <= 0) continue;
    const r = (sq / 9) | 0, c = sq % 9;
    const add = (to: number) => { const t = b[to] * s; if (t > 0) return; if (capsOnly && t === 0) return; out.push(enc(sq, to)); };
    switch (p) {
      case 1:
        for (const [dr, dc] of ORTH) { const rr = r + dr, cc = c + dc; if (inPalace(rr, cc, s)) add(rr * 9 + cc); }
        break;
      case 2:
        for (const [dr, dc] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) { const rr = r + dr, cc = c + dc; if (inPalace(rr, cc, s)) add(rr * 9 + cc); }
        break;
      case 3:
        for (const [dr, dc] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) {
          const rr = r + 2 * dr, cc = c + 2 * dc;
          if (rr < 0 || rr > 9 || cc < 0 || cc > 8) continue;
          if (s > 0 ? rr < 5 : rr > 4) continue;
          if (b[(r + dr) * 9 + c + dc]) continue;
          add(rr * 9 + cc);
        }
        break;
      case 4:
        for (const [dr, dc, lr, lc] of KN) {
          const rr = r + dr, cc = c + dc;
          if (rr < 0 || rr > 9 || cc < 0 || cc > 8) continue;
          if (b[(r + lr) * 9 + c + lc]) continue;
          add(rr * 9 + cc);
        }
        break;
      case 5:
        for (const [dr, dc] of ORTH) {
          let rr = r + dr, cc = c + dc;
          while (rr >= 0 && rr <= 9 && cc >= 0 && cc <= 8) {
            const t = b[rr * 9 + cc];
            if (t === 0) { if (!capsOnly) out.push(enc(sq, rr * 9 + cc)); } else { if (t * s < 0) out.push(enc(sq, rr * 9 + cc)); break; }
            rr += dr; cc += dc;
          }
        }
        break;
      case 6:
        for (const [dr, dc] of ORTH) {
          let rr = r + dr, cc = c + dc, jumped = false;
          while (rr >= 0 && rr <= 9 && cc >= 0 && cc <= 8) {
            const t = b[rr * 9 + cc];
            if (!jumped) {
              if (t === 0) { if (!capsOnly) out.push(enc(sq, rr * 9 + cc)); } else jumped = true;
            } else if (t !== 0) { if (t * s < 0) out.push(enc(sq, rr * 9 + cc)); break; }
            rr += dr; cc += dc;
          }
        }
        break;
      case 7: {
        const f = s > 0 ? -1 : 1;
        if (r + f >= 0 && r + f <= 9) add((r + f) * 9 + c);
        if (s > 0 ? r <= 4 : r >= 5) { if (c > 0) add(r * 9 + c - 1); if (c < 8) add(r * 9 + c + 1); }
        break;
      }
    }
  }
}

export function kingSq(b: Int8Array, s: number): number {
  const r0 = s > 0 ? 7 : 0;
  for (let r = r0; r < r0 + 3; r++) for (let c = 3; c <= 5; c++) if (b[r * 9 + c] === s) return r * 9 + c;
  return -1;
}

// Ô sq có đang bị phe "by" chiếu không (kể cả hai tướng đối mặt)
export function attacked(b: Int8Array, sq: number, by: number): boolean {
  const r = (sq / 9) | 0, c = sq % 9;
  for (let d = 0; d < 4; d++) {
    const dr = ORTH[d][0], dc = ORTH[d][1];
    let rr = r + dr, cc = c + dc, screen = false;
    while (rr >= 0 && rr <= 9 && cc >= 0 && cc <= 8) {
      const t = b[rr * 9 + cc];
      if (t !== 0) {
        if (!screen) {
          if (t === by * 5) return true;
          if (t === by && dc === 0) return true; // tướng đối mặt
          screen = true;
        } else { if (t === by * 6) return true; break; }
      }
      rr += dr; cc += dc;
    }
  }
  for (const [dr, dc, lr, lc] of KN) { // mã ở (r-dr, c-dc) nhảy tới sq, chân mã nằm cạnh mã
    const nr = r - dr, nc = c - dc;
    if (nr < 0 || nr > 9 || nc < 0 || nc > 8) continue;
    if (b[nr * 9 + nc] !== by * 4) continue;
    if (!b[(nr + lr) * 9 + nc + lc]) return true;
  }
  const f = by > 0 ? -1 : 1; // hướng tiến của tốt phe by
  const pr = r - f;
  if (pr >= 0 && pr <= 9 && b[pr * 9 + c] === by * 7) return true;
  for (const dc of [-1, 1]) {
    const nc = c + dc;
    if (nc < 0 || nc > 8) continue;
    if (b[r * 9 + nc] === by * 7 && (by > 0 ? r <= 4 : r >= 5)) return true;
  }
  return false;
}

export function inCheck(b: Int8Array, s: number): boolean {
  const k = kingSq(b, s);
  return k < 0 ? true : attacked(b, k, -s);
}

// Đi thử, trả về quân bị ăn (để hoàn lại bằng undo)
export function make(b: Int8Array, m: number): number {
  const f = m >> 7, t = m & 127, cap = b[t];
  b[t] = b[f]; b[f] = 0;
  return cap;
}
export function undo(b: Int8Array, m: number, cap: number) {
  const f = m >> 7, t = m & 127;
  b[f] = b[t]; b[t] = cap;
}

export function legalMoves(b: Int8Array, s: number): number[] {
  const all: number[] = [];
  genMoves(b, s, all);
  const res: number[] = [];
  for (const m of all) {
    const cap = make(b, m);
    if (!inCheck(b, s)) res.push(m);
    undo(b, m, cap);
  }
  return res;
}

// ---------- Máy ----------
const MATE = 1e6;
const VAL = [0, 0, 22, 22, 45, 100, 48, 10];
function evalRed(b: Int8Array): number {
  let v = 0;
  for (let sq = 0; sq < 90; sq++) {
    const x = b[sq];
    if (!x) continue;
    const t = x > 0 ? x : -x, s = x > 0 ? 1 : -1;
    const r = (sq / 9) | 0, c = sq % 9;
    let sc = VAL[t];
    const cen = 4 - Math.abs(c - 4);
    if (t === 4 || t === 5 || t === 6) sc += cen * 2;
    if (t === 4) { const ar = s > 0 ? 9 - r : r; sc += Math.min(ar, 6); }
    if (t === 7) { const crossed = s > 0 ? r <= 4 : r >= 5; if (crossed) sc += 12 + cen * 2; }
    if (t === 5 && (s > 0 ? r <= 1 : r >= 8)) sc += 6;
    v += s * sc;
  }
  return v;
}
const evalFor = (b: Int8Array, s: number) => (s > 0 ? evalRed(b) : -evalRed(b));

export function botMove(board: Int8Array, side: number, level: number, msOverride?: number): number {
  const b = board.slice() as Int8Array;
  const cfg = level <= 1 ? { d: 2, ms: 300, margin: 70 } : level === 2 ? { d: 4, ms: 900, margin: 6 } : { d: 12, ms: 2200, margin: 3 };
  const deadline = Date.now() + (msOverride ?? cfg.ms);
  let nodes = 0, aborted = false;
  const killers: number[][] = Array.from({ length: 32 }, () => [0, 0]);
  const score = (m: number, s: number) => {
    const v = b[m & 127];
    return v ? (VAL[v > 0 ? v : -v] * 10 - VAL[b[m >> 7] > 0 ? b[m >> 7] : -b[m >> 7]] / 10 + 100000) : 0;
  };
  function order(moves: number[], s: number, ply: number, first: number) {
    const k = killers[ply] || [0, 0];
    const keyed = moves.map((m) => ({ m, s: m === first ? 1e9 : score(m, s) + (m === k[0] ? 5000 : m === k[1] ? 2000 : 0) }));
    keyed.sort((x, y) => y.s - x.s);
    return keyed.map((x) => x.m);
  }
  function qs(s: number, alpha: number, beta: number, d: number, ply: number): number {
    if ((++nodes & 1023) === 0 && Date.now() > deadline) aborted = true;
    if (aborted) return 0;
    const stand = evalFor(b, s);
    if (d <= 0 || stand >= beta) return stand;
    if (stand > alpha) alpha = stand;
    const mv: number[] = [];
    genMoves(b, s, mv, true);
    for (const m of order(mv, s, 31, 0)) {
      const cap = make(b, m);
      if (inCheck(b, s)) { undo(b, m, cap); continue; }
      const v = -qs(-s, -beta, -alpha, d - 1, ply + 1);
      undo(b, m, cap);
      if (aborted) return 0;
      if (cap === -s * 1 || cap === s * -1) return MATE - ply; // ăn được tướng (không xảy ra với nước hợp lệ)
      if (v >= beta) return v;
      if (v > alpha) alpha = v;
    }
    return alpha;
  }
  function search(s: number, depth: number, alpha: number, beta: number, ply: number): number {
    if ((++nodes & 1023) === 0 && Date.now() > deadline) aborted = true;
    if (aborted) return 0;
    if (depth <= 0) return qs(s, alpha, beta, 5, ply);
    const mv: number[] = [];
    genMoves(b, s, mv);
    let legal = 0, best = -Infinity;
    for (const m of order(mv, s, Math.min(ply, 31), 0)) {
      const cap = make(b, m);
      if (inCheck(b, s)) { undo(b, m, cap); continue; }
      legal++;
      const ext = ply < 14 && inCheck(b, -s) ? 1 : 0;
      const v = -search(-s, depth - 1 + ext, -beta, -alpha, ply + 1);
      undo(b, m, cap);
      if (aborted) return 0;
      if (v > best) best = v;
      if (v > alpha) alpha = v;
      if (alpha >= beta) {
        if (!cap) { const k = killers[Math.min(ply, 31)]; if (k[0] !== m) { k[1] = k[0]; k[0] = m; } }
        break;
      }
    }
    if (!legal) return -MATE + ply; // hết nước đi là thua trong cờ tướng
    return best;
  }

  let root = legalMoves(b, side);
  if (!root.length) return -1;
  if (root.length === 1) return root[0];
  let best = root[0];
  let cands: number[] = root.slice();
  for (let d = 1; d <= cfg.d; d++) {
    let bv = -Infinity;
    const scored: { m: number; v: number }[] = [];
    const ord = order(root, side, 0, best);
    for (const m of ord) {
      const cap = make(b, m);
      const ext = inCheck(b, -side) ? 1 : 0;
      const alpha = bv === -Infinity ? -Infinity : bv - cfg.margin;
      const v = -search(-side, d - 1 + ext, -Infinity, -alpha, 1);
      undo(b, m, cap);
      if (aborted) break;
      scored.push({ m, v });
      if (v > bv) bv = v;
    }
    if (aborted) break;
    scored.sort((x, y) => y.v - x.v);
    best = scored[0].m;
    cands = scored.filter((x) => x.v >= bv - cfg.margin).map((x) => x.m);
    root = scored.map((x) => x.m);
    if (bv > MATE - 100) break; // đã thấy nước chiếu bí
    if (Date.now() > deadline - (msOverride ?? cfg.ms) * 0.55) break;
  }
  return cands[(Math.random() * cands.length) | 0] ?? best;
}
