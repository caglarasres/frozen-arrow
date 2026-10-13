// İlerleme kaydı. Tarayıcı depolaması kapalıysa oyun yine çalışır, sadece kaydetmez.
const KEY = 'vak.save.v1';

export interface LevelResult {
  stars: number;
  bestTimeMs: number;
}

interface SaveData {
  hints: number;
  levels: Record<string, LevelResult>;
}

const DEFAULT: SaveData = { hints: 3, levels: {} };

export function load(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT);
    return { ...structuredClone(DEFAULT), ...(JSON.parse(raw) as Partial<SaveData>) };
  } catch {
    return structuredClone(DEFAULT);
  }
}

export function save(data: SaveData): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* depolama yok */
  }
}

export function recordResult(levelId: string, result: LevelResult): SaveData {
  const data = load();
  const prev = data.levels[levelId];
  data.levels[levelId] = {
    stars: Math.max(prev?.stars ?? 0, result.stars),
    bestTimeMs: prev ? Math.min(prev.bestTimeMs, result.bestTimeMs) : result.bestTimeMs,
  };
  save(data);
  return data;
}
