import type { Camera } from './camera';

export interface InputHandlers {
  /** Tek dokunuş (ekran koordinatı). Bir şey bulunduysa true döner. */
  onTap(sx: number, sy: number): boolean;
  /** Boş yere çift dokunuş: yakınlaştır / uzaklaştır. */
  onDoubleTap(sx: number, sy: number): void;
  /** Kullanıcı kamerayı elle oynattı (animasyonları durdurmak için). */
  onManualMove(): void;
}

const TAP_MOVE = 10;
const TAP_TIME = 350;
const DOUBLE_TAP_TIME = 300;

/** Dokunmatik + fare girişi: kaydırma, iki parmakla yakınlaştırma, tekerlek, dokunma. */
export function attachInput(el: HTMLElement, camera: Camera, h: InputHandlers): () => void {
  const pointers = new Map<number, { x: number; y: number }>();
  let tap: { x: number; y: number; t: number } | null = null;
  let lastTap: { x: number; y: number; t: number } | null = null;
  let pinch: { dist: number; mx: number; my: number } | null = null;

  const pos = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const pinchState = () => {
    const [a, b] = [...pointers.values()];
    return { dist: Math.hypot(a.x - b.x, a.y - b.y), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
  };

  const down = (e: PointerEvent) => {
    el.setPointerCapture(e.pointerId);
    const p = pos(e);
    pointers.set(e.pointerId, p);
    if (pointers.size === 1) {
      tap = { ...p, t: performance.now() };
    } else if (pointers.size === 2) {
      tap = null;
      pinch = pinchState();
    }
  };

  const move = (e: PointerEvent) => {
    const prev = pointers.get(e.pointerId);
    if (!prev) return;
    const p = pos(e);
    pointers.set(e.pointerId, p);
    if (pointers.size >= 2 && pinch) {
      const next = pinchState();
      camera.zoomAt(next.mx, next.my, next.dist / Math.max(pinch.dist, 1));
      camera.panBy(next.mx - pinch.mx, next.my - pinch.my);
      pinch = next;
      h.onManualMove();
    } else if (pointers.size === 1) {
      if (tap && Math.hypot(p.x - tap.x, p.y - tap.y) > TAP_MOVE) tap = null;
      if (!tap) {
        camera.panBy(p.x - prev.x, p.y - prev.y);
        h.onManualMove();
      }
    }
  };

  const up = (e: PointerEvent) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch = null;
    if (pointers.size === 1) {
      // Pinch bitti; kalan parmak sıçrama yapmasın diye yeniden başlat.
      tap = null;
    }
    if (pointers.size === 0 && tap && e.type === 'pointerup') {
      const now = performance.now();
      if (now - tap.t < TAP_TIME) {
        const found = h.onTap(tap.x, tap.y);
        if (!found && lastTap && now - lastTap.t < DOUBLE_TAP_TIME && Math.hypot(tap.x - lastTap.x, tap.y - lastTap.y) < 40) {
          h.onDoubleTap(tap.x, tap.y);
          lastTap = null;
        } else {
          lastTap = found ? null : { x: tap.x, y: tap.y, t: now };
        }
      }
      tap = null;
    }
  };

  const wheel = (e: WheelEvent) => {
    e.preventDefault();
    const r = el.getBoundingClientRect();
    camera.zoomAt(e.clientX - r.left, e.clientY - r.top, Math.exp(-e.deltaY * 0.0015));
    h.onManualMove();
  };

  el.addEventListener('pointerdown', down);
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
  el.addEventListener('wheel', wheel, { passive: false });
  return () => {
    el.removeEventListener('pointerdown', down);
    el.removeEventListener('pointermove', move);
    el.removeEventListener('pointerup', up);
    el.removeEventListener('pointercancel', up);
    el.removeEventListener('wheel', wheel);
  };
}
