import React from 'react';
import { AssessmentResult as ResultType } from '../../types';
import { IconArrowRight, IconRefresh } from '@tabler/icons-react';

interface AssessmentResultProps {
  result: ResultType;
  onViewDiagram: () => void;
  onRetake: () => void;
}

const AssessmentResult: React.FC<AssessmentResultProps> = ({
  result,
  onViewDiagram,
  onRetake,
}) => {
  const { levelData, primaryLevel, isTransitioning, range } = result;

  return (
    <div className="text-center space-y-6 py-4">
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
        style={{
          backgroundColor: `${levelData.color}20`,
          color: levelData.color,
        }}
      >
        <span className="text-lg font-bold">Level {primaryLevel}</span>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          {levelData.shortTitle}
        </h3>

        {isTransitioning && range && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You're transitioning between Levels {range.from} and {range.to}
          </p>
        )}
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mx-auto">
        {levelData.taskProfile[0]}
      </p>

      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={onViewDiagram}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 dark:bg-slate-100 px-4 py-2.5 text-sm font-medium text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
        >
          View on Diagram
          <IconArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={onRetake}
          className="inline-flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <IconRefresh className="w-4 h-4" />
          Retake Assessment
        </button>
      </div>
    </div>
  );
};

export default AssessmentResult;
