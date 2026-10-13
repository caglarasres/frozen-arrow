import type { Ticker } from 'pixi.js';

export type Ease = (t: number) => number;
export const easeOutCubic: Ease = (t) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic: Ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOutBack: Ease = (t) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);

interface Tween {
  elapsed: number;
  duration: number;
  ease: Ease;
  update: (p: number) => void;
  done?: () => void;
  tag?: string;
}

/** Ticker'a bağlı basit tween yöneticisi. */
export class Tweens {
  private list: Tween[] = [];

  constructor(ticker: Ticker) {
    ticker.add((t) => this.step(t.deltaMS));
  }

  add(duration: number, update: (p: number) => void, opts: { ease?: Ease; done?: () => void; tag?: string } = {}): void {
    this.list.push({ elapsed: 0, duration, ease: opts.ease ?? easeOutCubic, update, done: opts.done, tag: opts.tag });
  }

  cancel(tag: string): void {
    this.list = this.list.filter((t) => t.tag !== tag);
  }

  private step(dt: number): void {
    if (!this.list.length) return;
    const finished: Tween[] = [];
    for (const t of this.list) {
      t.elapsed += dt;
      const p = Math.min(1, t.elapsed / t.duration);
      t.update(t.ease(p));
      if (p >= 1) finished.push(t);
    }
    if (finished.length) {
      this.list = this.list.filter((t) => !finished.includes(t));
      for (const t of finished) t.done?.();
    }
  }
}
