import React from 'react';
import { IconChecklist } from '@tabler/icons-react';
import { LevelTransition } from '../../types';

interface ActionItemsListProps {
  transition: LevelTransition;
}

const ActionItemsList: React.FC<ActionItemsListProps> = ({ transition }) => {
  const { actionItems } = transition;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-md bg-slate-100 dark:bg-dark-warm-secondary border border-slate-200 dark:border-slate-700">
          <IconChecklist className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Your Action Plan
        </h3>
      </div>

      <div className="space-y-2">
        {actionItems.map((item, index) => (
          <ActionItem
            key={index}
            number={index + 1}
            title={item.title}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

interface ActionItemProps {
  number: number;
  title: string;
  description: string;
  category: 'process' | 'technical' | 'organizational';
}

const categoryStyles = {
  process: {
    bg: 'bg-blue-100 dark:bg-blue-900/40',
    text: 'text-blue-700 dark:text-blue-300',
    label: 'Process',
  },
  technical: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    label: 'Technical',
  },
  organizational: {
    bg: 'bg-purple-100 dark:bg-purple-900/40',
    text: 'text-purple-700 dark:text-purple-300',
    label: 'Organizational',
  },
};

const ActionItem: React.FC<ActionItemProps> = ({ number, title, description, category }) => {
  const categoryStyle = categoryStyles[category];

  return (
    <div className="flex gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-warm-secondary/50">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 dark:bg-slate-100 flex items-center justify-center">
        <span className="text-xs font-bold text-white dark:text-slate-900">{number}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {title}
          </span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${categoryStyle.bg} ${categoryStyle.text}`}>
            {categoryStyle.label}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ActionItemsList;
