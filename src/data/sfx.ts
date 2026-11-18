// Âm thanh dùng chung cho các game (/game/). Tạo âm bằng Web Audio, không cần file âm thanh.
// Dùng: import { sfx, mountMute } from '../../data/sfx';  sfx.play('pop');  mountMute(containerElement);
// Âm chỉ phát sau khi người chơi đã bấm hoặc chạm vào trang (trình duyệt yêu cầu). Trạng thái tắt tiếng lưu trong localStorage 'sfx-mute'.
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;
try { muted = localStorage.getItem('sfx-mute') === '1'; } catch {}

function ac(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    try { ctx = new AC(); master = ctx!.createGain(); master!.gain.value = muted ? 0 : 0.5; master!.connect(ctx!.destination); } catch { ctx = null; return null; }
  }
  if (ctx!.state === 'suspended') ctx!.resume().catch(() => {});
  return ctx;
}
// mở khóa âm thanh ở lần chạm đầu tiên
if (typeof window !== 'undefined') {
  const unlock = () => { ac(); };
  window.addEventListener('pointerdown', unlock, { once: true });
  window.addEventListener('keydown', unlock, { once: true });
}

type Wave = OscillatorType;
// Một nốt: tần số (có thể trượt tới f2), thời lượng, kiểu sóng, âm lượng, độ trễ
function tone(f: number, dur: number, type: Wave = 'sine', vol = 0.3, f2?: number, delay = 0) {
  const c = ac(); if (!c || !master || muted) return;
  const t0 = c.currentTime + delay;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t0);
  if (f2) o.frequency.exponentialRampToValueAtTime(Math.max(20, f2), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(master);
  o.start(t0); o.stop(t0 + dur + 0.03);
}
let noiseBuf: AudioBuffer | null = null;
function noise(dur: number, vol = 0.3, lp = 4000, hp = 0, delay = 0) {
  const c = ac(); if (!c || !master || muted) return;
  if (!noiseBuf) { noiseBuf = c.createBuffer(1, c.sampleRate * 1, c.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
  const t0 = c.currentTime + delay;
  const s = c.createBufferSource(); s.buffer = noiseBuf;
  const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = lp;
  const g = c.createGain();
  g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  s.connect(f); let last: AudioNode = f;
  if (hp) { const h = c.createBiquadFilter(); h.type = 'highpass'; h.frequency.value = hp; f.connect(h); last = h; }
  last.connect(g); g.connect(master);
  s.start(t0, Math.random() * 0.5); s.stop(t0 + dur + 0.03);
}
const N = (semi: number) => 440 * Math.pow(2, (semi - 9) / 12); // 0 = C4

const presets: Record<string, () => void> = {
  click: () => tone(520, 0.05, 'triangle', 0.18),
  select: () => tone(660, 0.07, 'triangle', 0.2, 880),
  pop: () => { tone(380, 0.09, 'sine', 0.3, 760); },
  coin: () => { tone(N(19), 0.07, 'square', 0.14); tone(N(26), 0.16, 'square', 0.14, undefined, 0.07); },
  gem: () => { tone(N(24), 0.06, 'sine', 0.18, N(31)); },
  hit: () => { noise(0.08, 0.25, 3000); tone(160, 0.08, 'square', 0.15, 80); },
  hurt: () => { tone(260, 0.2, 'sawtooth', 0.22, 90); noise(0.12, 0.15, 1500); },
  explode: () => { noise(0.55, 0.55, 900); tone(110, 0.4, 'sine', 0.4, 28); },
  boom: () => { noise(0.3, 0.35, 1400); tone(90, 0.25, 'sine', 0.35, 35); },
  shoot: () => { tone(900, 0.1, 'square', 0.1, 260); },
  laser: () => { tone(1400, 0.14, 'sawtooth', 0.1, 300); },
  zap: () => { noise(0.12, 0.2, 7000, 1500); tone(180, 0.12, 'sawtooth', 0.12, 700); },
  swoosh: () => { noise(0.18, 0.2, 5000, 700); },
  jump: () => { tone(300, 0.16, 'square', 0.12, 700); },
  land: () => { noise(0.06, 0.2, 700); },
  place: () => { tone(220, 0.09, 'triangle', 0.3, 140); },
  move: () => { tone(300, 0.05, 'triangle', 0.25, 230); noise(0.03, 0.1, 2500); },
  capture: () => { tone(200, 0.1, 'triangle', 0.32, 120); noise(0.07, 0.15, 2000); },
  check: () => { tone(N(12), 0.12, 'square', 0.12); tone(N(7), 0.18, 'square', 0.12, undefined, 0.1); },
  flip: () => { tone(500, 0.06, 'triangle', 0.18, 800); },
  match: () => { tone(N(12), 0.1, 'triangle', 0.22); tone(N(16), 0.1, 'triangle', 0.22, undefined, 0.07); tone(N(19), 0.16, 'triangle', 0.22, undefined, 0.14); },
  combo: () => { for (let i = 0; i < 4; i++) tone(N(12 + i * 4), 0.11, 'triangle', 0.2, undefined, i * 0.06); },
  correct: () => { tone(N(12), 0.1, 'sine', 0.3); tone(N(19), 0.22, 'sine', 0.3, undefined, 0.09); },
  wrong: () => { tone(200, 0.28, 'sawtooth', 0.2, 110); },
  error: () => { tone(150, 0.12, 'square', 0.14); },
  tick: () => tone(1000, 0.03, 'square', 0.07),
  count: () => tone(440, 0.14, 'square', 0.14),
  go: () => tone(880, 0.35, 'square', 0.16),
  levelup: () => { [0, 4, 7, 12].forEach((s, i) => tone(N(s + 12), 0.14, 'triangle', 0.25, undefined, i * 0.09)); },
  win: () => { [0, 4, 7, 12, 16, 19, 24].forEach((s, i) => tone(N(s + 12), 0.2, 'triangle', 0.25, undefined, i * 0.1)); },
  lose: () => { [7, 5, 3, 0].forEach((s, i) => tone(N(s), 0.3, 'sawtooth', 0.16, undefined, i * 0.18)); },
  boost: () => { tone(300, 0.4, 'sawtooth', 0.1, 1200); noise(0.35, 0.1, 6000, 1000); },
  skid: () => { noise(0.18, 0.08, 6000, 2500); },
  build: () => { tone(180, 0.08, 'square', 0.15); tone(240, 0.1, 'square', 0.15, undefined, 0.07); },
  sell: () => { tone(N(19), 0.08, 'triangle', 0.2); tone(N(12), 0.1, 'triangle', 0.2, undefined, 0.07); },
  wave: () => { tone(N(0), 0.25, 'sawtooth', 0.15, N(7)); tone(N(7), 0.35, 'sawtooth', 0.15, undefined, 0.2); },
  eat: () => { tone(420, 0.06, 'square', 0.14, 640); },
  dash: () => { noise(0.2, 0.2, 4000, 800); tone(250, 0.2, 'sawtooth', 0.1, 600); },
  power: () => { tone(N(7), 0.1, 'triangle', 0.22); tone(N(14), 0.1, 'triangle', 0.22, undefined, 0.08); tone(N(19), 0.2, 'triangle', 0.22, undefined, 0.16); },
  bomb: () => { tone(120, 0.12, 'sine', 0.3, 90); },
  fuse: () => { noise(0.15, 0.08, 5000, 2500); },
};

// Tiếng động cơ liên tục: gọi engine(tốc_độ_0_đến_1) mỗi khung hình, engine(-1) để tắt
let eng: { o: OscillatorNode; g: GainNode } | null = null;
function engine(v: number) {
  const c = ac(); if (!c || !master) return;
  if (v < 0 || muted) { if (eng) { try { eng.g.gain.setTargetAtTime(0, c.currentTime, 0.05); eng.o.stop(c.currentTime + 0.3); } catch {} eng = null; } return; }
  if (!eng) {
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sawtooth'; g.gain.value = 0;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 600;
    o.connect(f); f.connect(g); g.connect(master); o.start();
    eng = { o, g };
  }
  const vv = Math.max(0, Math.min(1, v));
  eng.o.frequency.setTargetAtTime(55 + vv * 120, c.currentTime, 0.06);
  eng.g.gain.setTargetAtTime(0.05 + vv * 0.05, c.currentTime, 0.08);
}

// Nhạc nền ngắn lặp lại, tạo bằng code. Kiểu: 'calm' (nhẹ), 'action' (nhanh), null để tắt.
let musicTimer: number | null = null;
let musicStyle: string | null = null;
function music(style: 'calm' | 'action' | 'tense' | null) {
  if (musicTimer !== null) { clearInterval(musicTimer); musicTimer = null; }
  musicStyle = style;
  if (!style) return;
  const scale = style === 'calm' ? [0, 2, 4, 7, 9, 12] : style === 'tense' ? [0, 3, 5, 6, 7, 10] : [0, 3, 5, 7, 10, 12];
  const bpm = style === 'calm' ? 84 : style === 'tense' ? 100 : 128;
  const step = 60 / bpm / 2;
  let i = 0;
  const bass = style === 'calm' ? [0, 0, 5, 5, 7, 7, 5, 5] : [0, 0, 0, 3, 5, 5, 3, 3];
  musicTimer = window.setInterval(() => {
    if (muted || document.hidden) return;
    const c = ac(); if (!c) return;
    const bar = Math.floor(i / 8) % 8;
    if (i % 2 === 0) tone(N(bass[bar] - 12), step * 1.8, style === 'calm' ? 'sine' : 'triangle', 0.1);
    if (Math.random() < (style === 'calm' ? 0.55 : 0.7)) {
      const n = scale[Math.floor(Math.random() * scale.length)];
      tone(N(n + 12), step * 1.4, style === 'calm' ? 'sine' : 'square', style === 'calm' ? 0.06 : 0.035);
    }
    if (style !== 'calm' && i % 4 === 2) noise(0.04, 0.05, 8000, 4000);
    i++;
  }, step * 1000);
}

export const sfx = {
  play(name: string) { const p = presets[name]; if (p) { try { p(); } catch {} } },
  tone, noise, engine, music,
  get muted() { return muted; },
  setMuted(m: boolean) {
    muted = m;
    try { localStorage.setItem('sfx-mute', m ? '1' : '0'); } catch {}
    if (master) master.gain.value = m ? 0 : 0.5;
    if (m) engine(-1);
  },
};

// Thêm nút bật/tắt tiếng vào một phần tử. Gọi một lần khi trang tải.
export function mountMute(host: HTMLElement | null) {
  if (!host) return;
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'sfx-btn';
  b.style.cssText = 'position:absolute;top:8px;right:8px;z-index:5;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.25);background:rgba(10,14,30,.55);color:#fff;font-size:17px;cursor:pointer;line-height:1;padding:0';
  const paint = () => { b.textContent = muted ? '🔇' : '🔊'; b.setAttribute('aria-label', muted ? 'Sound off' : 'Sound on'); };
  b.addEventListener('click', (e) => { e.stopPropagation(); sfx.setMuted(!muted); paint(); if (!muted) sfx.play('click'); });
  paint();
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  host.appendChild(b);
}
