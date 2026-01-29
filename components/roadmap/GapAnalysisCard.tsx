import React from 'react';
import { IconArrowsExchange } from '@tabler/icons-react';
import { LevelTransition } from '../../types';

interface GapAnalysisCardProps {
  transition: LevelTransition;
}

const GapAnalysisCard: React.FC<GapAnalysisCardProps> = ({ transition }) => {
  const { gapAnalysis } = transition;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-md bg-slate-100 dark:bg-dark-warm-secondary border border-slate-200 dark:border-slate-700">
          <IconArrowsExchange className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          What Changes
        </h3>
      </div>

      <div className="grid gap-3">
        <GapItem
          label="Task Profile"
          description={gapAnalysis.taskEvolution}
          color="blue"
        />
        <GapItem
          label="Risk Level"
          description={gapAnalysis.riskIncrease}
          color="amber"
        />
        <GapItem
          label="Scope"
          description={gapAnalysis.scopeExpansion}
          color="emerald"
        />
      </div>
    </div>
  );
};

interface GapItemProps {
  label: string;
  description: string;
  color: 'blue' | 'amber' | 'emerald';
}

const colorMap = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    label: 'text-blue-700 dark:text-blue-300',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    label: 'text-amber-700 dark:text-amber-300',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    label: 'text-emerald-700 dark:text-emerald-300',
  },
};

const GapItem: React.FC<GapItemProps> = ({ label, description, color }) => {
  const colors = colorMap[color];

  return (
    <div className={`rounded-lg border p-3 ${colors.bg} ${colors.border}`}>
      <div className={`text-xs font-semibold mb-1 ${colors.label}`}>
        {label}
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
};

export default GapAnalysisCard;
