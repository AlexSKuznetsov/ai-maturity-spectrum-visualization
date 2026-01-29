import React, { useState } from 'react';
import { LevelData } from '../../types';
import { DiagramProvider } from './DiagramContext';
import { useDiagramLayout } from './useDiagramLayout';

interface DiagramRootProps {
  levels: LevelData[];
  activeLevel: LevelData | null;
  assessedLevel: number | null;
  onSelect: (level: LevelData) => void;
  children: React.ReactNode;
}

const DiagramRoot: React.FC<DiagramRootProps> = ({
  levels,
  activeLevel,
  assessedLevel,
  onSelect,
  children
}) => {
  const [hoveredLevelId, setHoveredLevelId] = useState<number | null>(null);
  const layout = useDiagramLayout(levels);

  return (
    <DiagramProvider
      value={{
        ...layout,
        levels,
        activeLevel,
        assessedLevel,
        hoveredLevelId,
        setHoveredLevelId,
        onSelect
      }}
    >
      {children}
    </DiagramProvider>
  );
};

export default DiagramRoot;
