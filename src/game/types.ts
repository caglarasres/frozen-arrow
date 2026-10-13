export interface DuckSpot {
  id: number;
  x: number;
  y: number;
  r: number;
  pose: string;
}

export interface LevelData {
  id: string;
  world: number;
  name: string;
  tutorial?: boolean;
  boss?: boolean;
  hideable?: boolean;
  targetCount: number;
  size: [number, number];
  line: string;
  color: string;
  ducks: DuckSpot[];
  golden: { x: number; y: number; r: number } | null;
}

export interface LevelsFile {
  version: number;
  levels: LevelData[];
}
