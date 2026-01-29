import React from 'react';
import { LevelData } from '../../types';
import EngineeringStatusBadge from './EngineeringStatusBadge';

interface DiagramHeaderProps {
  activeLevel: LevelData | null;
}

const DiagramHeader: React.FC<DiagramHeaderProps> = ({ activeLevel }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
      <div className="flex flex-col space-y-1.2">
        <h3 className="font-semibold leading-none tracking-tight text-md">Maturity Map</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
          Interactive diagram of AI adoption levels.
        </p>
      </div>

      <EngineeringStatusBadge level={activeLevel} />
    </div>
  );
};

export default DiagramHeader;
