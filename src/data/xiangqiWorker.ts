// Chạy máy cờ tướng trong Web Worker để trang không bị đứng khi máy nghĩ.
import { botMove } from './xiangqiEngine';

self.onmessage = (e: MessageEvent) => {
  const { b, side, level } = e.data as { b: Int8Array; side: number; level: number };
  (self as unknown as Worker).postMessage({ mv: botMove(b, side, level) });
};
