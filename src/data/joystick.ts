// Cần điều khiển tròn cho điện thoại: chạm giữ rồi kéo để chọn hướng.
// onChange nhận toạ độ chuẩn hoá trong khoảng -1..1 (x sang phải, y xuống dưới), thả tay thì về (0, 0).
export function createJoystick(el: HTMLElement, onChange: (x: number, y: number) => void) {
  const knob = document.createElement('div');
  knob.className = 'joy-knob';
  el.appendChild(knob);
  let active: number | null = null;

  function move(e: PointerEvent) {
    const r = el.getBoundingClientRect();
    const max = r.width / 2 - 22;
    let dx = e.clientX - (r.left + r.width / 2);
    let dy = e.clientY - (r.top + r.height / 2);
    const len = Math.hypot(dx, dy);
    if (len > max) { dx = (dx / len) * max; dy = (dy / len) * max; }
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
    onChange(dx / max, dy / max);
  }

  function release(e: PointerEvent) {
    if (e.pointerId !== active) return;
    active = null;
    knob.style.transform = 'translate(0, 0)';
    onChange(0, 0);
  }

  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    active = e.pointerId;
    try { el.setPointerCapture(e.pointerId); } catch {}
    move(e);
  });
  el.addEventListener('pointermove', (e) => { if (e.pointerId === active) move(e); });
  el.addEventListener('pointerup', release);
  el.addEventListener('pointercancel', release);
  el.addEventListener('lostpointercapture', release);
}
