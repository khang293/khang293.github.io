// Chạy máy cờ caro mức cao ở luồng nền để trang không bị đứng khi máy nghĩ. Xem caroEngine.ts.
import { insaneMove, ultraMove } from './caroEngine';

self.onmessage = (e: MessageEvent) => {
  const { board, me, ms, n, lvl } = e.data;
  const b = new Int8Array(board);
  const mv = lvl >= 5 ? ultraMove(b, me, ms, n) : insaneMove(b, me, ms, n);
  (self as any).postMessage({ mv });
};
