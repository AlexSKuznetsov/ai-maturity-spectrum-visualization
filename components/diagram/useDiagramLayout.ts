import { useMemo } from 'react';
import { LevelData } from '../../types';

export interface DiagramConfig {
  width: number;
  height: number;
  padding: number;
  blockWidth: number;
  blockHeight: number;
  blockOffset: number;
  blockYOffset: number;
}

export interface LevelWithCoords extends LevelData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BackgroundZone {
  id: number;
  x: number;
  width: number;
  color: string;
}

export interface DiagramLayoutData {
  config: DiagramConfig;
  levelsWithCoords: LevelWithCoords[];
  bgZones: BackgroundZone[];
  connectorPath: string;
  transitionX: number;
}

const DEFAULT_CONFIG: DiagramConfig = {
  width: 800,
  height: 500,
  padding: 60,
  blockWidth: 100,
  blockHeight: 60,
  blockOffset: 40,
  blockYOffset: 30
};

export const useDiagramLayout = (levels: LevelData[]): DiagramLayoutData => {
  const config = DEFAULT_CONFIG;

  const levelsWithCoords = useMemo(() => {
    return levels.map((level, index) => {
      const startX = config.padding + config.blockOffset;
      const endX = config.width - config.padding;
      const availableWidth = endX - startX - config.blockWidth;
      const xStep = levels.length > 1 ? availableWidth / (levels.length - 1) : 0;
      const x = startX + index * xStep;

      const startY = config.height - config.padding - config.blockHeight - config.blockYOffset;
      const endY = config.padding;
      const yStep = levels.length > 1 ? (startY - endY) / (levels.length - 1) : 0;
      const y = startY - index * yStep;

      return { ...level, x, y, width: config.blockWidth, height: config.blockHeight };
    });
  }, [levels]);

  const bgZones = useMemo(() => {
    return levelsWithCoords.map((level, index) => {
      let startX = 0;
      let endX = 0;

      if (index === 0) {
        startX = config.padding;
      } else {
        const prev = levelsWithCoords[index - 1];
        startX = (prev.x + prev.width + level.x) / 2;
      }

      if (index === levelsWithCoords.length - 1) {
        endX = config.width - config.padding / 2;
      } else {
        const next = levelsWithCoords[index + 1];
        endX = (level.x + level.width + next.x) / 2;
      }

      return {
        id: level.id,
        x: startX,
        width: endX - startX,
        color: level.color
      };
    });
  }, [levelsWithCoords]);

  const connectorPath = useMemo(() => {
    if (levelsWithCoords.length === 0) {
      return '';
    }

    let path = `M ${levelsWithCoords[0].x + config.blockWidth / 2} ${
      levelsWithCoords[0].y + config.blockHeight / 2
    }`;

    levelsWithCoords.forEach((level) => {
      path += ` L ${level.x + config.blockWidth / 2} ${level.y + config.blockHeight / 2}`;
    });

    return path;
  }, [levelsWithCoords]);

  const transitionX = useMemo(() => {
    if (levelsWithCoords.length < 3) {
      return config.width / 2;
    }

    const transitionIndex = 1;
    return (
      levelsWithCoords[transitionIndex].x +
      levelsWithCoords[transitionIndex + 1].x +
      config.blockWidth
    ) / 2;
  }, [levelsWithCoords]);

  return {
    config,
    levelsWithCoords,
    bgZones,
    connectorPath,
    transitionX
  };
};
