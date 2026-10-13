import { Application, Assets, Container, Graphics, Sprite, Texture } from 'pixi.js';
import { Camera } from './camera';
import { attachInput } from './input';
import { chime, haptic, quack, softTick } from './audio';
import { Tweens, easeInOutCubic, easeOutBack, easeOutCubic } from './tween';
import type { DuckSpot, LevelData } from './types';

// Sahnedeki SVG'lerin derlenmiş adresleri: "art/world-1/level-01/line.svg" → URL
const artUrls = import.meta.glob('../../art/**/*.svg', { query: '?url', import: 'default', eager: true }) as Record<string, string>;
const urlFor = (path: string) => {
  const url = artUrls[`../../${path}`];
  if (!url) throw new Error(`Görsel bulunamadı: ${path}`);
  return url;
};

export interface LevelEvents {
  onFound(found: number, total: number, duck: DuckSpot): void;
  onGolden(): void;
  onComplete(result: { timeMs: number; hintsUsed: number; golden: boolean }): void;
}

/** Bir seviyeyi çalıştırır: sahne, kamera, dokunma, renklendirme, ipucu. */
export class LevelScene {
  readonly world = new Container();
  private readonly camera: Camera;
  private readonly tweens: Tweens;
  private readonly revealMask = new Graphics();
  private readonly fx = new Container();
  private colorFull!: Sprite;
  private found = new Set<number>();
  private reveals: { x: number; y: number; r: number }[] = [];
  private goldenFound = false;
  private hintsUsed = 0;
  private startedAt = 0;
  private finished = false;
  private detachInput: (() => void) | null = null;
  private readonly onResize = () => this.camera.setViewport(this.app.screen.width, this.app.screen.height);

  private constructor(
    private readonly app: Application,
    private readonly level: LevelData,
    private readonly events: LevelEvents,
    hudHeight: number,
  ) {
    this.camera = new Camera(this.world, level.size[0], level.size[1], hudHeight);
    this.tweens = new Tweens(app.ticker);
  }

  static async create(app: Application, level: LevelData, events: LevelEvents, hudHeight: number): Promise<LevelScene> {
    const scene = new LevelScene(app, level, events, hudHeight);
    await scene.build();
    return scene;
  }

  get total(): number {
    return this.level.ducks.length;
  }

  private async build(): Promise<void> {
    const [lineTex, colorTex] = await Promise.all([
      Assets.load<Texture>({ src: urlFor(this.level.line), data: { resolution: 1 } }),
      Assets.load<Texture>({ src: urlFor(this.level.color), data: { resolution: 1 } }),
    ]);
    const line = new Sprite(lineTex);
    const colorRevealed = new Sprite(colorTex);
    colorRevealed.mask = this.revealMask;
    this.colorFull = new Sprite(colorTex);
    this.colorFull.alpha = 0;
    this.world.addChild(line, colorRevealed, this.revealMask, this.colorFull, this.fx);
    this.app.stage.addChild(this.world);
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  start(): void {
    this.startedAt = performance.now();
    this.detachInput = attachInput(this.app.canvas, this.camera, {
      onTap: (sx, sy) => this.tap(sx, sy),
      onDoubleTap: (sx, sy) => this.doubleTap(sx, sy),
      onManualMove: () => this.tweens.cancel('camera'),
    });
  }

  destroy(): void {
    this.detachInput?.();
    window.removeEventListener('resize', this.onResize);
    this.world.destroy({ children: true });
  }

  private tap(sx: number, sy: number): boolean {
    if (this.finished) return false;
    const p = this.camera.toWorld(sx, sy);
    // Dokunma alanı en az 24 CSS px yarıçap (≈ 48 px çap), sahne ne kadar küçük olursa olsun.
    const minR = 24 / this.camera.scale;
    let best: DuckSpot | null = null;
    let bestD = Infinity;
    for (const d of this.level.ducks) {
      if (this.found.has(d.id)) continue;
      const dist = Math.hypot(p.x - d.x, p.y - d.y);
      if (dist <= Math.max(d.r, minR) && dist < bestD) {
        best = d;
        bestD = dist;
      }
    }
    if (best) {
      this.foundDuck(best);
      return true;
    }
    const g = this.level.golden;
    if (g && !this.goldenFound && Math.hypot(p.x - g.x, p.y - g.y) <= Math.max(g.r, 18 / this.camera.scale)) {
      this.goldenFound = true;
      this.reveal(g.x, g.y, g.r * 1.6);
      this.burst(g.x, g.y, g.r, 0xf2b705, 14);
      quack(1.4);
      haptic(30);
      this.events.onGolden();
      return true;
    }
    this.ripple(p.x, p.y);
    softTick();
    return false;
  }

  private foundDuck(d: DuckSpot): void {
    this.found.add(d.id);
    this.reveal(d.x, d.y, d.r * 1.35);
    this.burst(d.x, d.y, d.r, 0x8ec3e6, 10);
    quack(0.9 + Math.random() * 0.25);
    haptic(18);
    this.events.onFound(this.found.size, this.total, d);
    if (this.found.size === this.total) this.complete();
  }

  private complete(): void {
    this.finished = true;
    const timeMs = performance.now() - this.startedAt;
    // Önce uzaklaş, sonra bütün sahneyi renklendir.
    const from = { x: this.camera.x, y: this.camera.y, s: this.camera.scale };
    const to = this.camera.targetFor(this.level.size[0] / 2, this.level.size[1] / 2, this.camera.minScale);
    this.tweens.add(
      700,
      (p) => this.camera.set(from.x + (to.x - from.x) * p, from.y + (to.y - from.y) * p, from.s + (to.scale - from.s) * p),
      {
        ease: easeInOutCubic,
        tag: 'camera',
        done: () => {
          chime();
          this.tweens.add(1200, (p) => (this.colorFull.alpha = p), {
            ease: easeInOutCubic,
            done: () => this.events.onComplete({ timeMs, hintsUsed: this.hintsUsed, golden: this.goldenFound }),
          });
        },
      },
    );
  }

  /** İpucu: bulunmamış bir ördeğin bölgesini (tam yerini değil) gösterir. */
  hint(): boolean {
    if (this.finished) return false;
    const left = this.level.ducks.filter((d) => !this.found.has(d.id));
    if (!left.length) return false;
    const d = left[Math.floor(Math.random() * left.length)];
    this.hintsUsed++;
    const regionR = Math.max(d.r * 4, 260);
    const angle = Math.random() * Math.PI * 2;
    const off = regionR * 0.5;
    const cx = d.x + Math.cos(angle) * off;
    const cy = d.y + Math.sin(angle) * off;

    // Bölge ekranın dışındaysa kamerayı oraya götür.
    const target = this.camera.targetFor(cx, cy, Math.max(this.camera.scale, this.camera.minScale * 1.8));
    const from = { x: this.camera.x, y: this.camera.y, s: this.camera.scale };
    this.tweens.add(600, (p) => this.camera.set(from.x + (target.x - from.x) * p, from.y + (target.y - from.y) * p, from.s + (target.scale - from.s) * p), {
      ease: easeInOutCubic,
      tag: 'camera',
    });

    const ring = new Graphics();
    this.fx.addChild(ring);
    this.tweens.add(
      3000,
      (p) => {
        const pulse = 0.5 + 0.5 * Math.sin(p * Math.PI * 6);
        ring.clear();
        ring.circle(cx, cy, regionR).fill({ color: 0xffd23f, alpha: 0.12 + 0.12 * pulse });
        ring.circle(cx, cy, regionR).stroke({ color: 0xff8c42, width: 6 / this.camera.scale + 4, alpha: 0.5 + 0.5 * pulse });
      },
      { ease: (t) => t, done: () => ring.destroy() },
    );
    return true;
  }

  private doubleTap(sx: number, sy: number): void {
    const from = { x: this.camera.x, y: this.camera.y, s: this.camera.scale };
    const p = this.camera.toWorld(sx, sy);
    const targetScale = this.camera.isZoomedOut ? this.camera.startScale * 2.5 : this.camera.startScale;
    const to = this.camera.targetFor(p.x, p.y, targetScale);
    this.tweens.add(350, (k) => this.camera.set(from.x + (to.x - from.x) * k, from.y + (to.y - from.y) * k, from.s + (to.scale - from.s) * k), {
      ease: easeOutCubic,
      tag: 'camera',
    });
  }

  private reveal(x: number, y: number, r: number): void {
    const entry = { x, y, r: 0 };
    this.reveals.push(entry);
    this.tweens.add(
      420,
      (p) => {
        entry.r = r * p;
        this.redrawMask();
      },
      { ease: easeOutBack },
    );
  }

  private redrawMask(): void {
    this.revealMask.clear();
    for (const c of this.reveals) if (c.r > 0) this.revealMask.circle(c.x, c.y, c.r).fill(0xffffff);
  }

  private ripple(x: number, y: number): void {
    const g = new Graphics();
    this.fx.addChild(g);
    const s = this.camera.scale;
    this.tweens.add(
      380,
      (p) => {
        g.clear();
        g.circle(x, y, (10 + 28 * p) / s).stroke({ color: 0x000000, width: 3 / s, alpha: 0.5 * (1 - p) });
      },
      { done: () => g.destroy() },
    );
  }

  private burst(x: number, y: number, r: number, color: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const b = new Graphics();
      const size = r * (0.12 + Math.random() * 0.12);
      b.circle(0, 0, size).fill({ color: 0xffffff }).stroke({ color, width: Math.max(3, size * 0.3) });
      b.position.set(x, y);
      this.fx.addChild(b);
      const a = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const dist = r * (1.3 + Math.random() * 0.8);
      this.tweens.add(
        650 + Math.random() * 250,
        (p) => {
          b.position.set(x + Math.cos(a) * dist * p, y + Math.sin(a) * dist * p - r * 0.4 * p);
          b.alpha = 1 - p;
          b.scale.set(0.6 + 0.6 * p);
        },
        { done: () => b.destroy() },
      );
    }
  }
}
