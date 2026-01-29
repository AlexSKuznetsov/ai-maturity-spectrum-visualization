import React from 'react';
import { LevelData } from '../../types';
import { ScrollArea } from '../ui/ScrollArea';
import { IconCheck } from '@tabler/icons-react';

interface MobileLevelListProps {
  levels: LevelData[];
  activeLevel: LevelData | null;
  assessedLevel: number | null;
  onLevelSelect: (level: LevelData) => void;
}

const MobileLevelList: React.FC<MobileLevelListProps> = ({
  levels,
  activeLevel,
  assessedLevel,
  onLevelSelect
}) => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="space-y-3 p-2">
        {levels.map((level) => {
          const isActive = activeLevel?.id === level.id;
          const isAssessed = assessedLevel === level.id;

          return (
            <button
              key={level.id}
              onClick={() => onLevelSelect(level)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                isActive
                  ? 'shadow-md'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
              style={{
                borderColor: isActive ? level.color : undefined,
                backgroundColor: isActive ? `${level.color}10` : undefined
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="relative w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: level.color }}
                >
                  {level.id}
                  {isAssessed && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                      <IconCheck className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                    {level.shortTitle}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                    {level.taskProfile[0]}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default MobileLevelList;
