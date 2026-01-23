import React, { createContext, useContext } from 'react';
import { LevelData } from '../../types';
import { DiagramLayoutData } from './useDiagramLayout';

export interface DiagramContextValue extends DiagramLayoutData {
  levels: LevelData[];
  activeLevel: LevelData | null;
  hoveredLevelId: number | null;
  setHoveredLevelId: React.Dispatch<React.SetStateAction<number | null>>;
  onSelect: (level: LevelData) => void;
}

const DiagramContext = createContext<DiagramContextValue | null>(null);

export const DiagramProvider: React.FC<{
  value: DiagramContextValue;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return <DiagramContext.Provider value={value}>{children}</DiagramContext.Provider>;
};

export const useDiagramContext = () => {
  const context = useContext(DiagramContext);

  if (!context) {
    throw new Error('useDiagramContext must be used within DiagramProvider');
  }

  return context;
};
