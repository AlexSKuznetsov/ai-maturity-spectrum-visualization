import React from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { LevelData } from '../../types';

interface DiagramFooterControlsProps {
  activeLevel: LevelData | null;
  levelCount: number;
  onPrevious: () => void;
  onNext: () => void;
}

const DiagramFooterControls: React.FC<DiagramFooterControlsProps> = ({
  activeLevel,
  levelCount,
  onPrevious,
  onNext
}) => {
  return (
    <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50 flex items-center justify-between z-10">
      <button
        onClick={onPrevious}
        disabled={!activeLevel || activeLevel.id === 1}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:text-slate-200 h-9 px-4 py-2 shadow-sm"
      >
        <IconChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </button>

      <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        Level {activeLevel?.id || '-'} / {levelCount}
      </span>

      <button
        onClick={onNext}
        disabled={!activeLevel || activeLevel.id === levelCount}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-900/90 dark:hover:bg-slate-200 h-9 px-4 py-2 shadow-sm"
      >
        Next
        <IconChevronRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
};

export default DiagramFooterControls;
