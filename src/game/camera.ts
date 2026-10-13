import type { Container } from 'pixi.js';

/** Sahneyi kaydırma ve yakınlaştırma. Dünya konteynerinin konumunu ve ölçeğini yönetir. */
export class Camera {
  scale = 1;
  x = 0;
  y = 0;
  minScale = 1;
  startScale = 1;
  maxScale = 4;
  private vw = 1;
  private vh = 1;
  private initialized = false;

  constructor(
    private readonly world: Container,
    private readonly contentW: number,
    private readonly contentH: number,
    private readonly insetTop = 0,
  ) {}

  setViewport(w: number, h: number): void {
    const fitBefore = this.scale <= this.minScale + 1e-6;
    this.vw = w;
    this.vh = h;
    const availH = h - this.insetTop;
    this.minScale = Math.min(w / this.contentW, availH / this.contentH);
    // En fazla: 1 sahne pikseli = 1.5 ekran pikseli, ama en az 5 kat yakınlaştırma.
    this.maxScale = Math.max(this.minScale * 5, 1.5);
    if (!this.initialized) {
      // Telefonda sahne ekran yüksekliğini doldurarak başlar; yatayda kaydırılır.
      this.initialized = true;
      this.scale = clamp(availH / this.contentH, this.minScale, this.maxScale);
      this.startScale = this.scale;
      this.x = (w - this.contentW * this.scale) / 2;
    } else if (fitBefore) {
      this.scale = this.minScale;
    }
    this.scale = clamp(this.scale, this.minScale, this.maxScale);
    this.apply();
  }

  /** Ekrandaki (px, py) noktasını sabit tutarak ölçeği değiştirir. */
  zoomAt(px: number, py: number, factor: number): void {
    const next = clamp(this.scale * factor, this.minScale, this.maxScale);
    const wx = (px - this.x) / this.scale;
    const wy = (py - this.y) / this.scale;
    this.scale = next;
    this.x = px - wx * next;
    this.y = py - wy * next;
    this.apply();
  }

  panBy(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
    this.apply();
  }

  /** Dünya noktasını ekranın ortasına getirecek kamera değerleri. */
  targetFor(wx: number, wy: number, scale: number): { x: number; y: number; scale: number } {
    const s = clamp(scale, this.minScale, this.maxScale);
    const cy = this.insetTop + (this.vh - this.insetTop) / 2;
    return this.clamped(this.vw / 2 - wx * s, cy - wy * s, s);
  }

  set(x: number, y: number, scale: number): void {
    this.x = x;
    this.y = y;
    this.scale = clamp(scale, this.minScale, this.maxScale);
    this.apply();
  }

  toWorld(sx: number, sy: number): { x: number; y: number } {
    return { x: (sx - this.x) / this.scale, y: (sy - this.y) / this.scale };
  }

  get isZoomedOut(): boolean {
    return this.scale <= this.startScale * 1.05;
  }

  private clamped(x: number, y: number, s: number): { x: number; y: number; scale: number } {
    const w = this.contentW * s;
    const h = this.contentH * s;
    const availH = this.vh - this.insetTop;
    const nx = w <= this.vw ? (this.vw - w) / 2 : clamp(x, this.vw - w, 0);
    const ny = h <= availH ? this.insetTop + (availH - h) / 2 : clamp(y, this.vh - h, this.insetTop);
    return { x: nx, y: ny, scale: s };
  }

  private apply(): void {
    const c = this.clamped(this.x, this.y, this.scale);
    this.x = c.x;
    this.y = c.y;
    this.world.position.set(this.x, this.y);
    this.world.scale.set(this.scale);
  }
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}
