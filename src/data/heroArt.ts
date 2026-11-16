// Vẽ 4 nhân vật người chơi (Hiệp sĩ, Pháp sư, Cung thủ, Nhẫn giả) bằng Canvas, dùng chung cho các trò chơi.
// Gốc toạ độ là tâm nhân vật, chân ở khoảng y = +20, đầu ở khoảng y = -17.

export type Look = { fx: number; fy: number; moving: boolean; s: number; human: boolean };
export type G = CanvasRenderingContext2D;

function rr(g: G, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}
function disc(g: G, x: number, y: number, r: number) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); }
function edge(g: G, w = 1.6) { g.lineWidth = w; g.lineJoin = 'round'; g.strokeStyle = 'rgba(15,23,42,.7)'; g.stroke(); }
function ball(g: G, x: number, y: number, r: number, c1: string, c2: string) {
  const k = g.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r * 1.1);
  k.addColorStop(0, c1); k.addColorStop(1, c2);
  return k;
}
function vert(g: G, y0: number, y1: number, c1: string, c2: string) {
  const k = g.createLinearGradient(0, y0, 0, y1);
  k.addColorStop(0, c1); k.addColorStop(1, c2);
  return k;
}

// Nhân vật người chơi, tỉ lệ chibi: đầu to, thân nhỏ, cầm vũ khí riêng
export function paintHero(g: G, skin: number, o: Look, time: number) {
  const sw = o.moving ? Math.sin(time * 14) : 0;
  const SKIN1 = '#ffe2c4', SKIN2 = '#f0b48a';
  const body = [
    ['#d5dde8', '#6b7a90'], ['#a78bfa', '#4c1d95'], ['#4ade80', '#14532d'], ['#4b5563', '#0b1020'],
  ][skin];
  const belt = ['#facc15', '#fde047', '#92400e', '#dc2626'][skin];

  // Khăn đỏ của Nhẫn giả bay phía sau
  if (skin === 3) {
    g.fillStyle = '#dc2626';
    g.beginPath();
    g.moveTo(5, 3);
    g.quadraticCurveTo(14, 2 + Math.sin(time * 9) * 3, 22, 7 + Math.sin(time * 9 + 1) * 4);
    g.lineTo(21, 12 + Math.sin(time * 9 + 1) * 4);
    g.quadraticCurveTo(12, 8, 4, 8);
    g.closePath(); g.fill(); edge(g, 1.2);
  }
  // Chân
  g.fillStyle = '#1f2937';
  for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(sx * 5 + sx * sw * 2, 17.5, 5, 3.2, 0, 0, Math.PI * 2); g.fill(); edge(g, 1.2); }
  // Thân
  rr(g, -8.5, 3, 17, 14.5, 6); g.fillStyle = vert(g, 3, 17.5, body[0], body[1]); g.fill(); edge(g);
  g.fillStyle = belt; g.fillRect(-8, 10.5, 16, 3);
  if (skin === 0) { g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(-5, 5, 3, 5); }
  if (skin === 1) { g.fillStyle = '#fde047'; g.beginPath(); g.arc(0, 7.5, 1.6, 0, Math.PI * 2); g.fill(); }

  // Vũ khí và tay
  const lh = 9 - sw * 2, rh = 9 + sw * 2;
  if (skin === 2) { // cung ở tay trái
    g.strokeStyle = '#92400e'; g.lineWidth = 3; g.lineCap = 'round';
    g.beginPath(); g.arc(-3, 8, 15, Math.PI - 1.05, Math.PI + 1.05); g.stroke();
    const ex = -3 + 15 * Math.cos(Math.PI - 1.05), ey1 = 8 + 15 * Math.sin(Math.PI - 1.05), ey2 = 8 + 15 * Math.sin(Math.PI + 1.05);
    g.strokeStyle = '#f8fafc'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(ex, ey1); g.lineTo(ex, ey2); g.stroke();
  }
  if (skin === 1) { // gậy phép ở tay phải
    g.strokeStyle = '#78350f'; g.lineWidth = 3; g.lineCap = 'round';
    g.beginPath(); g.moveTo(12.5, 19); g.lineTo(13.5, -12); g.stroke();
    const glow = 4.4 + Math.sin(time * 6) * 0.7;
    const k = g.createRadialGradient(13.5, -15, 1, 13.5, -15, glow + 4);
    k.addColorStop(0, '#ffffff'); k.addColorStop(0.45, '#67e8f9'); k.addColorStop(1, 'rgba(103,232,249,0)');
    g.fillStyle = k; g.beginPath(); g.arc(13.5, -15, glow + 4, 0, Math.PI * 2); g.fill();
  }
  g.fillStyle = SKIN1;
  disc(g, -11, lh, 3.3); g.fill(); edge(g, 1.2);
  disc(g, 11, rh, 3.3); g.fill(); edge(g, 1.2);
  if (skin === 0) { // khiên (trái) và kiếm (phải)
    disc(g, -14, 10, 7.5); g.fillStyle = ball(g, -14, 10, 7.5, '#93c5fd', '#1d4ed8'); g.fill(); edge(g);
    g.fillStyle = '#facc15'; g.fillRect(-15, 5, 2, 10); g.fillRect(-19, 9, 10, 2);
    g.save(); g.translate(12.5, rh); g.rotate(-0.25);
    g.fillStyle = '#e2e8f0'; g.beginPath(); g.moveTo(-2, -2); g.lineTo(-2, -17); g.lineTo(0, -21); g.lineTo(2, -17); g.lineTo(2, -2); g.closePath(); g.fill(); edge(g, 1.2);
    g.fillStyle = '#facc15'; g.fillRect(-5.5, -3, 11, 2.8);
    g.fillStyle = '#92400e'; g.fillRect(-1.5, -0.5, 3, 5);
    g.restore();
    disc(g, 11, rh, 3.3); g.fillStyle = SKIN1; g.fill(); edge(g, 1.2);
  }
  if (skin === 3) { // phi tiêu
    g.save(); g.translate(13, rh - 1); g.rotate(0.35);
    g.fillStyle = '#cbd5e1'; g.beginPath(); g.moveTo(0, -12); g.lineTo(3, -4); g.lineTo(0, -2); g.lineTo(-3, -4); g.closePath(); g.fill(); edge(g, 1.1);
    g.strokeStyle = '#111827'; g.lineWidth = 1.6; g.beginPath(); g.arc(0, 1, 2.4, 0, Math.PI * 2); g.stroke();
    g.restore();
    disc(g, 11, rh, 3.3); g.fillStyle = SKIN1; g.fill(); edge(g, 1.2);
  }

  // Đầu
  disc(g, 0, -5, 11.5); g.fillStyle = ball(g, 0, -5, 11.5, SKIN1, SKIN2); g.fill(); edge(g);

  // Mũ và tóc
  if (skin === 0) {
    g.beginPath(); g.arc(0, -5, 12.6, Math.PI, Math.PI * 2); g.closePath();
    g.fillStyle = vert(g, -18, -5, '#e2e8f0', '#7b8aa0'); g.fill(); edge(g);
    g.fillStyle = '#facc15'; g.fillRect(-12.4, -8, 24.8, 3);
    g.fillStyle = '#7b8aa0'; g.fillRect(-1.3, -8, 2.6, 8);
    g.fillStyle = '#ef4444';
    g.beginPath(); g.moveTo(-1, -17.5); g.quadraticCurveTo(10, -24, 13, -11); g.quadraticCurveTo(7, -15, -1, -13); g.closePath(); g.fill(); edge(g, 1.2);
  } else if (skin === 1) {
    g.fillStyle = '#5b21b6'; g.beginPath(); g.ellipse(0, -10, 16, 4.2, 0, 0, Math.PI * 2); g.fill(); edge(g);
    g.beginPath(); g.moveTo(-10, -10.5); g.quadraticCurveTo(-5, -21, 3, -30); g.quadraticCurveTo(8, -21, 10, -10.5); g.closePath();
    g.fillStyle = vert(g, -30, -10, '#8b5cf6', '#4c1d95'); g.fill(); edge(g);
    g.fillStyle = '#fde047'; g.fillRect(-9.6, -14, 19.2, 3);
    g.beginPath(); g.arc(2, -21, 2.2, 0, Math.PI * 2); g.fill();
  } else if (skin === 2) {
    g.beginPath(); g.arc(0, -5, 12.8, Math.PI * 0.95, Math.PI * 2.05); g.closePath();
    g.fillStyle = vert(g, -18, -5, '#4ade80', '#15803d'); g.fill(); edge(g);
    g.fillStyle = '#fb7185';
    g.beginPath(); g.moveTo(7, -14); g.quadraticCurveTo(15, -27, 20, -16); g.quadraticCurveTo(14, -17, 7, -11); g.closePath(); g.fill(); edge(g, 1.1);
  } else {
    disc(g, 0, -5, 12.6); g.fillStyle = vert(g, -18, 8, '#4b5563', '#0b1020'); g.fill(); edge(g);
    rr(g, -10, -10, 20, 9, 4); g.fillStyle = SKIN1; g.fill();
    g.fillStyle = '#dc2626'; g.fillRect(-12.4, -13.5, 24.8, 3.4);
    g.beginPath(); g.moveTo(12, -13); g.lineTo(21, -11 + Math.sin(time * 9) * 2); g.lineTo(12, -9.5); g.closePath(); g.fill(); edge(g, 1);
  }

  // Mặt
  const ey = skin === 3 ? -5.5 : -4;
  for (const sx of [-1, 1]) {
    g.fillStyle = '#fff'; g.beginPath(); g.ellipse(sx * 4.4, ey, 2.9, 3.5, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#0f172a'; g.beginPath(); g.arc(sx * 4.4 + o.fx * 1.2, ey + o.fy * 0.9, 1.8, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(sx * 4.4 + o.fx * 1.2 + 0.7, ey + o.fy * 0.9 - 0.7, 0.6, 0, Math.PI * 2); g.fill();
  }
  if (skin !== 3) {
    g.fillStyle = 'rgba(244,114,182,.45)';
    for (const sx of [-1, 1]) { g.beginPath(); g.arc(sx * 7.6, 0.2, 2.2, 0, Math.PI * 2); g.fill(); }
    g.strokeStyle = '#7c2d12'; g.lineWidth = 1.3; g.lineCap = 'round';
    g.beginPath(); g.arc(0, 0.6, 2.4, Math.PI * 0.15, Math.PI * 0.85); g.stroke();
  }
}

