// Oyun üstü arayüz (HTML): sayaç, ipucu butonu, öğretici kart, sonuç ekranı.
const DUCK_SVG = (filled: boolean) => `
<svg viewBox="-84 -84 186 152" aria-hidden="true">
  <g stroke="#000" stroke-width="9" stroke-linejoin="round">
    <path d="M -78 -28 Q -60 -5 -40 -10 L 15 -12 Q 70 -15 72 25 Q 70 62 0 62 Q -60 62 -72 30 Q -80 5 -78 -28 Z" fill="${filled ? '#FFD23F' : '#fff'}"/>
    <circle cx="35" cy="-45" r="34" fill="${filled ? '#FFD23F' : '#fff'}"/>
    <path d="M 64 -52 Q 94 -50 98 -39 Q 90 -28 64 -31 Z" fill="${filled ? '#FF8C42' : '#fff'}"/>
    <circle cx="45" cy="-53" r="6" fill="#000" stroke="none"/>
  </g>
</svg>`;

export const HUD_HEIGHT = 76;

export interface HudCallbacks {
  onHint(): void;
  onStart(): void;
  onReplay(): void;
}

export class Hud {
  private readonly root: HTMLElement;
  private readonly pips: HTMLElement;
  private readonly hintBtn: HTMLButtonElement;
  private readonly toastEl: HTMLElement;

  constructor(parent: HTMLElement, private readonly cb: HudCallbacks) {
    this.root = document.createElement('div');
    this.root.className = 'hud';
    this.root.innerHTML = `
      <header class="bar">
        <div class="title"><small>Seviye 1</small><strong></strong></div>
        <div class="pips" role="status" aria-live="polite"></div>
        <button class="hint" type="button" aria-label="İpucu"><span class="bulb">💡</span><span class="count"></span></button>
      </header>
      <div class="toast" hidden></div>
      <div class="overlay" hidden></div>`;
    parent.appendChild(this.root);
    this.pips = this.root.querySelector('.pips')!;
    this.hintBtn = this.root.querySelector('.hint')!;
    this.toastEl = this.root.querySelector('.toast')!;
    this.hintBtn.addEventListener('click', () => this.cb.onHint());
  }

  setLevel(name: string, total: number): void {
    this.root.querySelector('.title strong')!.textContent = name;
    this.pips.innerHTML = Array.from({ length: total }, () => `<span class="pip">${DUCK_SVG(false)}</span>`).join('');
    this.pips.setAttribute('aria-label', `0 / ${total} ördek`);
  }

  setFound(found: number, total: number): void {
    const pip = this.pips.children[found - 1] as HTMLElement | undefined;
    if (pip) {
      pip.innerHTML = DUCK_SVG(true);
      pip.classList.add('pop');
    }
    this.pips.setAttribute('aria-label', `${found} / ${total} ördek`);
  }

  setHints(n: number): void {
    this.hintBtn.querySelector('.count')!.textContent = String(n);
    this.hintBtn.disabled = n <= 0;
  }

  toast(text: string, ms = 1800): void {
    this.toastEl.textContent = text;
    this.toastEl.hidden = false;
    this.toastEl.classList.remove('show');
    void this.toastEl.offsetWidth;
    this.toastEl.classList.add('show');
    window.setTimeout(() => (this.toastEl.hidden = true), ms);
  }

  showIntro(total: number): void {
    this.overlay(`
      <div class="card">
        <div class="duck-big">${DUCK_SVG(true)}</div>
        <h1>Vak! Ördek Nerede?</h1>
        <p>Banyoda <b>${total} lastik ördek</b> saklandı.<br/>Ördeklere dokun, renklensinler!</p>
        <ul class="tips">
          <li>🤏 İki parmakla yakınlaştır</li>
          <li>☝️ Sürükleyerek gez</li>
          <li>💡 Takılırsan ipucu al</li>
        </ul>
        <button class="primary" data-act="start" type="button">Başla</button>
      </div>`);
  }

  showResult(r: { stars: number; timeMs: number; golden: boolean; hintsUsed: number }): void {
    const sec = Math.round(r.timeMs / 1000);
    const time = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
    const stars = [1, 2, 3].map((i) => `<span class="star ${i <= r.stars ? 'on' : ''}" style="animation-delay:${i * 0.15}s">★</span>`).join('');
    const tip =
      r.stars === 3 ? 'Mükemmel! Altın ördeği de buldun.' : r.golden ? 'Altın ördeği buldun! İpucusuz dene: 3 yıldız.' : 'Bir altın ördek daha saklı… Bulabilir misin?';
    this.overlay(`
      <div class="card result">
        <h1>Harika! 🎉</h1>
        <div class="stars">${stars}</div>
        <p class="stats">⏱ ${time} · 💡 ${r.hintsUsed} ipucu</p>
        <p class="tip">${tip}</p>
        <button class="primary" data-act="replay" type="button">Tekrar Oyna</button>
        <button class="secondary" type="button" disabled>Sonraki Seviye · yakında</button>
      </div>`);
  }

  hideOverlay(): void {
    const o = this.root.querySelector<HTMLElement>('.overlay')!;
    o.hidden = true;
    o.innerHTML = '';
  }

  private overlay(html: string): void {
    const o = this.root.querySelector<HTMLElement>('.overlay')!;
    o.innerHTML = html;
    o.hidden = false;
    o.querySelector('[data-act="start"]')?.addEventListener('click', () => this.cb.onStart());
    o.querySelector('[data-act="replay"]')?.addEventListener('click', () => this.cb.onReplay());
  }
}
