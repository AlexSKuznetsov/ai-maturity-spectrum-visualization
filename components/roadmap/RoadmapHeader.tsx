import React from 'react';
import { IconArrowRight } from '@tabler/icons-react';
import { LevelData } from '../../types';

interface RoadmapHeaderProps {
  currentLevel: LevelData;
  targetLevel: LevelData;
}

const RoadmapHeader: React.FC<RoadmapHeaderProps> = ({ currentLevel, targetLevel }) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Your Level-Up Roadmap
      </h2>

      <div className="flex items-start justify-center gap-3">
        <LevelBadge level={currentLevel} label="Current" />

        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-dark-warm-secondary mt-1">
          <IconArrowRight className="w-4 h-4 text-slate-500" />
        </div>

        <LevelBadge level={targetLevel} label="Target" highlighted />
      </div>
    </div>
  );
};

interface LevelBadgeProps {
  level: LevelData;
  label: string;
  highlighted?: boolean;
}

const LevelBadge: React.FC<LevelBadgeProps> = ({ level, label, highlighted }) => {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`px-4 py-2 rounded-lg border-2 transition-all ${
          highlighted
            ? 'shadow-md scale-105'
            : 'opacity-75'
        }`}
        style={{
          backgroundColor: `${level.color}15`,
          borderColor: highlighted ? level.color : `${level.color}40`,
          color: level.color,
        }}
      >
        <span className="text-sm font-bold">Level {level.id}</span>
      </div>
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
    </div>
  );
};

export default RoadmapHeader;
