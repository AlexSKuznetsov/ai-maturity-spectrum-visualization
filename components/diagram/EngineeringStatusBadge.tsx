import React from 'react';
import { LevelData } from '../../types';

interface EngineeringStatusBadgeProps {
  level: LevelData | null;
}

const EngineeringStatusBadge: React.FC<EngineeringStatusBadgeProps> = ({ level }) => {
  if (!level) {
    return null;
  }

  return (
    <div className="hidden sm:flex flex-col items-end">
      <div className="bg-slate-50 dark:bg-dark-warm-secondary border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 flex flex-col items-end shadow-sm">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
          Engineering Involvement
        </span>
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
            style={{ backgroundColor: level.color }}
          />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {level.engineeringInvolvement[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EngineeringStatusBadge;
