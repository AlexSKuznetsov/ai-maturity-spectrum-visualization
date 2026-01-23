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