import React from 'react';
import Diagram from '../Diagram';
import { LevelData } from '../../types';
import DiagramFooterControls from './DiagramFooterControls';
import DiagramHeader from './DiagramHeader';

interface DiagramCardProps {
  activeLevel: LevelData | null;
  levelCount: number;
  onLevelSelect: (level: LevelData) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const DiagramCard: React.FC<DiagramCardProps> = ({
  activeLevel,
  levelCount,
  onLevelSelect,
  onPrevious,
  onNext
}) => {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-50 shadow-sm h-full flex flex-col relative overflow-hidden transition-colors duration-300">
      <DiagramHeader activeLevel={activeLevel} />

      <div className="flex-1 relative min-h-0 flex items-center justify-center p-4">
        <Diagram activeLevel={activeLevel} onLevelSelect={onLevelSelect} />
      </div>

      <DiagramFooterControls
        activeLevel={activeLevel}
        levelCount={levelCount}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </div>
  );
};

export default DiagramCard;
