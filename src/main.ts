import { Application } from 'pixi.js';
import './style.css';
import levelsFile from '../levels/levels.json';
import { LevelScene } from './game/level';
import { unlockAudio } from './game/audio';
import { load, recordResult, save } from './game/storage';
import type { LevelsFile } from './game/types';
import { HUD_HEIGHT, Hud } from './ui/hud';

const level = (levelsFile as unknown as LevelsFile).levels.find((l) => l.id === 'w1-l01')!;

async function boot(): Promise<void> {
  const host = document.getElementById('app')!;
  const app = new Application();
  await app.init({
    resizeTo: window,
    background: '#efede6',
    antialias: true,
    autoDensity: true,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
  });
  host.appendChild(app.canvas);

  let scene: LevelScene | null = null;
  let hints = load().hints;

  const hud = new Hud(host, {
    onStart: () => {
      unlockAudio();
      hud.hideOverlay();
      scene?.start();
    },
    onHint: () => {
      if (hints <= 0 || !scene?.hint()) return;
      hints--;
      save({ ...load(), hints });
      hud.setHints(hints);
    },
    onReplay: () => {
      hud.hideOverlay();
      void startLevel(true);
    },
  });

  async function startLevel(immediate: boolean): Promise<void> {
    scene?.destroy();
    hud.setLevel(level.name, level.ducks.length);
    hud.setHints(hints);
    scene = await LevelScene.create(
      app,
      level,
      {
        onFound: (found, total) => {
          hud.setFound(found, total);
          if (found === 1 && level.tutorial) hud.toast('Vak! 🦆 Bir tane buldun!');
          else if (found === total - 1) hud.toast('Son bir ördek kaldı!');
        },
        onGolden: () => hud.toast('✨ Altın ördek! ✨', 2200),
        onComplete: ({ timeMs, hintsUsed, golden }) => {
          const stars = 1 + (hintsUsed === 0 ? 1 : 0) + (hintsUsed === 0 && golden ? 1 : 0);
          const data = recordResult(level.id, { stars, bestTimeMs: timeMs });
          // Seviye bitirmek +1 ipucu kazandırır.
          hints = data.hints + 1;
          save({ ...data, hints });
          hud.setHints(hints);
          hud.showResult({ stars, timeMs, golden, hintsUsed });
        },
      },
      HUD_HEIGHT,
    );
    if (immediate) scene.start();
    else hud.showIntro(level.ducks.length);
  }

  await startLevel(false);
}

void boot();
