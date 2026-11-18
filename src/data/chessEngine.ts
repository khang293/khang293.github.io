// Bộ máy cờ vua: luật đi quân đầy đủ (nhập thành, bắt tốt qua đường, phong cấp, chiếu hết, hòa) và máy chơi (alpha-beta).
// Quân: 1 tốt, 2 mã, 3 tượng, 4 xe, 5 hậu, 6 vua. Số dương là quân trắng, số âm là quân đen.
// Ô cờ đánh số 0..63, ô 0 là a8 (góc trên trái nhìn từ phía trắng), ô 63 là h1.

export interface State { b: number[]; turn: 1 | -1; cas: number; ep: number; half: number; full: number }
export interface Move { from: number; to: number; promo?: number; ep?: boolean; castle?: boolean }

const CAS_WK = 1, CAS_WQ = 2, CAS_BK = 4, CAS_BQ = 8;
export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const KN = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
const KG = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
const DIAG = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const ORTH = [[-1, 0], [1, 0], [0, -1], [0, 1]];

export function fromFen(fen: string): State {
  const [pos, turn, cas, ep, half, full] = fen.split(' ');
  const b = new Array(64).fill(0);
  let i = 0;
  for (const ch of pos) {
    if (ch === '/') continue;
    if (ch >= '1' && ch <= '8') { i += Number(ch); continue; }
    const k = 'pnbrqk'.indexOf(ch.toLowerCase()) + 1;
    b[i++] = ch === ch.toLowerCase() ? -k : k;
  }
  let c = 0;
  if (cas && cas.includes('K')) c |= CAS_WK;
  if (cas && cas.includes('Q')) c |= CAS_WQ;
  if (cas && cas.includes('k')) c |= CAS_BK;
  if (cas && cas.includes('q')) c |= CAS_BQ;
  const e = ep && ep !== '-' ? (8 - Number(ep[1])) * 8 + (ep.charCodeAt(0) - 97) : -1;
  return { b, turn: turn === 'b' ? -1 : 1, cas: c, ep: e, half: Number(half || 0), full: Number(full || 1) };
}
export const startState = () => fromFen(START_FEN);

export const sqName = (s: number) => String.fromCharCode(97 + (s & 7)) + (8 - (s >> 3));

function attacked(s: State, sq: number, by: 1 | -1): boolean {
  const r = sq >> 3, c = sq & 7, b = s.b;
  // tốt: tốt trắng ăn lên (hàng giảm), nên quân tấn công nằm ở hàng r+1 nếu by trắng
  const pr = r + (by === 1 ? 1 : -1);
  if (pr >= 0 && pr < 8) for (const dc of [-1, 1]) { const pc = c + dc; if (pc >= 0 && pc < 8 && b[pr * 8 + pc] === by) return true; }
  for (const [dr, dc] of KN) { const rr = r + dr, cc = c + dc; if (rr >= 0 && rr < 8 && cc >= 0 && cc < 8 && b[rr * 8 + cc] === 2 * by) return true; }
  for (const [dr, dc] of KG) { const rr = r + dr, cc = c + dc; if (rr >= 0 && rr < 8 && cc >= 0 && cc < 8 && b[rr * 8 + cc] === 6 * by) return true; }
  for (const [dr, dc] of DIAG) {
    let rr = r + dr, cc = c + dc;
    while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8) {
      const p = b[rr * 8 + cc];
      if (p) { if (p === 3 * by || p === 5 * by) return true; break; }
      rr += dr; cc += dc;
    }
  }
  for (const [dr, dc] of ORTH) {
    let rr = r + dr, cc = c + dc;
    while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8) {
      const p = b[rr * 8 + cc];
      if (p) { if (p === 4 * by || p === 5 * by) return true; break; }
      rr += dr; cc += dc;
    }
  }
  return false;
}

function kingSq(s: State, side: 1 | -1) { const k = 6 * side; for (let i = 0; i < 64; i++) if (s.b[i] === k) return i; return -1; }
export function inCheck(s: State, side: 1 | -1 = s.turn) { const k = kingSq(s, side); return k >= 0 && attacked(s, k, (-side) as 1 | -1); }

// Nước đi giả hợp lệ (chưa kiểm tra vua có bị chiếu không)
function pseudo(s: State, capturesOnly = false): Move[] {
  const out: Move[] = [], b = s.b, me = s.turn;
  for (let sq = 0; sq < 64; sq++) {
    const p = b[sq];
    if (!p || (p > 0) !== (me > 0)) continue;
    const t = Math.abs(p), r = sq >> 3, c = sq & 7;
    if (t === 1) {
      const dir = me === 1 ? -1 : 1, start = me === 1 ? 6 : 1, last = me === 1 ? 0 : 7;
      const r1 = r + dir;
      if (r1 < 0 || r1 > 7) continue;
      if (!b[r1 * 8 + c] && (!capturesOnly || r1 === last)) {
        if (r1 === last) for (const pr of [5, 4, 3, 2]) out.push({ from: sq, to: r1 * 8 + c, promo: pr });
        else {
          out.push({ from: sq, to: r1 * 8 + c });
        }
      }
      if (!capturesOnly && r === start && !b[r1 * 8 + c] && !b[(r + 2 * dir) * 8 + c]) out.push({ from: sq, to: (r + 2 * dir) * 8 + c });
      for (const dc of [-1, 1]) {
        const cc = c + dc;
        if (cc < 0 || cc > 7) continue;
        const to = r1 * 8 + cc, q = b[to];
        if (q && (q > 0) !== (me > 0)) {
          if (r1 === last) for (const pr of [5, 4, 3, 2]) out.push({ from: sq, to, promo: pr });
          else out.push({ from: sq, to });
        } else if (to === s.ep && !q) out.push({ from: sq, to, ep: true });
      }
    } else if (t === 2 || t === 6) {
      for (const [dr, dc] of t === 2 ? KN : KG) {
        const rr = r + dr, cc = c + dc;
        if (rr < 0 || rr > 7 || cc < 0 || cc > 7) continue;
        const q = b[rr * 8 + cc];
        if (!q) { if (!capturesOnly) out.push({ from: sq, to: rr * 8 + cc }); }
        else if ((q > 0) !== (me > 0)) out.push({ from: sq, to: rr * 8 + cc });
      }
      if (t === 6 && !capturesOnly) {
        const home = me === 1 ? 60 : 4, foe = (-me) as 1 | -1;
        if (sq === home && !attacked(s, sq, foe)) {
          const ks = me === 1 ? CAS_WK : CAS_BK, qs = me === 1 ? CAS_WQ : CAS_BQ;
          if ((s.cas & ks) && !b[home + 1] && !b[home + 2] && b[home + 3] === 4 * me && !attacked(s, home + 1, foe) && !attacked(s, home + 2, foe)) out.push({ from: sq, to: home + 2, castle: true });
          if ((s.cas & qs) && !b[home - 1] && !b[home - 2] && !b[home - 3] && b[home - 4] === 4 * me && !attacked(s, home - 1, foe) && !attacked(s, home - 2, foe)) out.push({ from: sq, to: home - 2, castle: true });
        }
      }
    } else {
      const dirs = t === 3 ? DIAG : t === 4 ? ORTH : [...DIAG, ...ORTH];
      for (const [dr, dc] of dirs) {
        let rr = r + dr, cc = c + dc;
        while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8) {
          const q = b[rr * 8 + cc];
          if (!q) { if (!capturesOnly) out.push({ from: sq, to: rr * 8 + cc }); }
          else { if ((q > 0) !== (me > 0)) out.push({ from: sq, to: rr * 8 + cc }); break; }
          rr += dr; cc += dc;
        }
      }
    }
  }
  return out;
}

export function makeMove(s: State, m: Move): State {
  const b = s.b.slice(), p = b[m.from], me = s.turn;
  const captured = b[m.to];
  b[m.from] = 0;
  b[m.to] = m.promo ? m.promo * me : p;
  if (m.ep) b[m.to + (me === 1 ? 8 : -8)] = 0;
  if (m.castle) {
    if (m.to > m.from) { b[m.from + 1] = b[m.from + 3]; b[m.from + 3] = 0; }
    else { b[m.from - 1] = b[m.from - 4]; b[m.from - 4] = 0; }
  }
  let cas = s.cas;
  if (Math.abs(p) === 6) cas &= me === 1 ? ~(CAS_WK | CAS_WQ) : ~(CAS_BK | CAS_BQ);
  for (const sq of [m.from, m.to]) {
    if (sq === 63) cas &= ~CAS_WK; else if (sq === 56) cas &= ~CAS_WQ; else if (sq === 7) cas &= ~CAS_BK; else if (sq === 0) cas &= ~CAS_BQ;
  }
  const ep = Math.abs(p) === 1 && Math.abs(m.to - m.from) === 16 ? (m.from + m.to) / 2 : -1;
  return { b, turn: (-me) as 1 | -1, cas, ep, half: Math.abs(p) === 1 || captured || m.ep ? 0 : s.half + 1, full: s.full + (me === -1 ? 1 : 0) };
}

export function legalMoves(s: State): Move[] {
  const out: Move[] = [];
  for (const m of pseudo(s)) { const n = makeMove(s, m); if (!inCheck(n, s.turn)) out.push(m); }
  return out;
}

export function perft(s: State, depth: number): number {
  if (depth === 0) return 1;
  let n = 0;
  for (const m of legalMoves(s)) n += depth === 1 ? 1 : perft(makeMove(s, m), depth - 1);
  return n;
}

function insufficient(s: State) {
  const minors: number[] = [];
  for (const p of s.b) { const t = Math.abs(p); if (t === 1 || t === 4 || t === 5) return false; if (t === 2 || t === 3) minors.push(t); }
  return minors.length <= 1;
}
export type Status = 'ok' | 'check' | 'mate' | 'stalemate' | 'fifty' | 'material';
export function status(s: State): Status {
  const has = legalMoves(s).length > 0, chk = inCheck(s);
  if (!has) return chk ? 'mate' : 'stalemate';
  if (s.half >= 100) return 'fifty';
  if (insufficient(s)) return 'material';
  return chk ? 'check' : 'ok';
}
export const posKey = (s: State) => s.b.join(',') + '|' + s.turn + '|' + s.cas + '|' + s.ep;

// ---------- Máy chơi ----------
const VAL = [0, 100, 320, 330, 500, 900, 0];
const PST: number[][] = [
  [],
  [0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30, 20, 10, 10, 5, 5, 10, 25, 25, 10, 5, 5, 0, 0, 0, 20, 20, 0, 0, 0, 5, -5, -10, 0, 0, -10, -5, 5, 5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0],
  [-50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30, 0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20, 20, 15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, -20, -40, -50, -40, -30, -30, -30, -30, -40, -50],
  [-20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 10, 10, 5, 0, -10, -10, 5, 5, 10, 10, 5, 5, -10, -10, 0, 10, 10, 10, 10, 0, -10, -10, 10, 10, 10, 10, 10, 10, -10, -10, 5, 0, 0, 0, 0, 5, -10, -20, -10, -10, -10, -10, -10, -10, -20],
  [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 10, 10, 10, 10, 10, 5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 5, 5, 0, 0, 0],
  [-20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 5, 5, 5, 0, -10, -5, 0, 5, 5, 5, 5, 0, -5, 0, 0, 5, 5, 5, 5, 0, -5, -10, 5, 5, 5, 5, 5, 0, -10, -10, 0, 5, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10, -10, -20],
  [-30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -20, -30, -30, -40, -40, -30, -30, -20, -10, -20, -20, -20, -20, -20, -20, -10, 20, 20, 0, 0, 0, 0, 20, 20, 20, 30, 10, 0, 0, 10, 30, 20],
];

function evaluate(s: State): number {
  let v = 0;
  for (let i = 0; i < 64; i++) {
    const p = s.b[i];
    if (!p) continue;
    const t = Math.abs(p);
    if (p > 0) v += VAL[t] + PST[t][i]; else v -= VAL[t] + PST[t][i ^ 56];
  }
  return s.turn === 1 ? v : -v;
}

const MATE = 100000;
let nodes = 0, deadline = 0, aborted = false;

function order(s: State, moves: Move[]) {
  const sc = (m: Move) => {
    const cap = s.b[m.to];
    let v = cap ? 10 * VAL[Math.abs(cap)] - VAL[Math.abs(s.b[m.from])] / 10 + 1000 : 0;
    if (m.promo) v += VAL[m.promo];
    return v;
  };
  return moves.map((m) => [sc(m), m] as [number, Move]).sort((a, b) => b[0] - a[0]).map((x) => x[1]);
}

function quiesce(s: State, alpha: number, beta: number, depth: number): number {
  const stand = evaluate(s);
  if (depth <= 0) return stand;
  if (stand >= beta) return stand;
  if (stand > alpha) alpha = stand;
  for (const m of order(s, pseudo(s, true))) {
    const n = makeMove(s, m);
    if (inCheck(n, s.turn)) continue;
    const v = -quiesce(n, -beta, -alpha, depth - 1);
    if (v >= beta) return v;
    if (v > alpha) alpha = v;
  }
  return alpha;
}

function search(s: State, depth: number, alpha: number, beta: number, ply: number): number {
  if ((++nodes & 1023) === 0 && Date.now() > deadline) aborted = true;
  if (aborted) return 0;
  if (s.half >= 100) return 0;
  if (depth <= 0) return quiesce(s, alpha, beta, 4);
  let any = false;
  for (const m of order(s, pseudo(s))) {
    const n = makeMove(s, m);
    if (inCheck(n, s.turn)) continue;
    any = true;
    const v = -search(n, depth - 1, -beta, -alpha, ply + 1);
    if (aborted) return 0;
    if (v >= beta) return v;
    if (v > alpha) alpha = v;
  }
  if (!any) return inCheck(s) ? -MATE + ply : 0;
  return alpha;
}

// level: 1 dễ, 2 thường, 3 khó
export function bestMove(s: State, level: number): Move | null {
  const moves = legalMoves(s);
  if (!moves.length) return null;
  if (moves.length === 1) return moves[0];
  nodes = 0; aborted = false;
  const maxDepth = level === 1 ? 1 : level === 2 ? 2 : 6;
  deadline = Date.now() + (level === 1 ? 300 : level === 2 ? 700 : 1500);
  let ordered = order(s, moves);
  let best = ordered[0];
  let scored: [number, Move][] = ordered.map((m) => [0, m]);
  for (let d = 1; d <= maxDepth; d++) {
    const cur: [number, Move][] = [];
    let alpha = -Infinity;
    for (const m of ordered) {
      const v = -search(makeMove(s, m), d - 1, -Infinity, -alpha, 1);
      if (aborted) break;
      cur.push([v, m]);
      if (v > alpha) alpha = v;
    }
    if (aborted) break;
    cur.sort((a, b) => b[0] - a[0]);
    scored = cur; best = cur[0][1]; ordered = cur.map((x) => x[1]);
    if (cur[0][0] > MATE - 50) break;
  }
  if (level === 1) { // dễ: chọn ngẫu nhiên trong vài nước tốt nhất, thỉnh thoảng đi bừa
    if (Math.random() < 0.25) return moves[(Math.random() * moves.length) | 0];
    const top = scored.slice(0, 4);
    return top[(Math.random() * top.length) | 0][1];
  }
  if (level === 2 && scored.length > 1 && Math.random() < 0.3) return scored[Math.min(1, scored.length - 1)][1];
  return best;
}
