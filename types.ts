export interface LevelData {
  id: number;
  title: string;
  shortTitle: string;
  taskProfile: string[];
  examples: string[];
  aiTools: string[];
  engineeringInvolvement: string[];
  keyCharacteristics: string[];
  color: string;
}

export interface Coordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  options: { text: string; levelId: number }[];
}

export interface AssessmentResult {
  primaryLevel: number;
  levelData: LevelData;
  isTransitioning: boolean;
  range: { from: number; to: number } | null;
}