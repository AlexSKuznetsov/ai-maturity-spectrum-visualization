import React from 'react';
import { LevelData } from '../../types';
import EngineeringStatusBadge from './EngineeringStatusBadge';
import InfoDialog from './InfoDialog';

interface DiagramHeaderProps {
  activeLevel: LevelData | null;
}

const DiagramHeader: React.FC<DiagramHeaderProps> = ({ activeLevel }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
      <div className="flex flex-col space-y-1.5">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-semibold leading-none tracking-tight text-lg">Maturity Map</h3>
          <InfoDialog />
        </div>
        <p className="text-md text-slate-500 dark:text-slate-400">
          Interactive diagram of AI adoption levels.
        </p>
      </div>

      <EngineeringStatusBadge level={activeLevel} />
    </div>
  );
};

export default DiagramHeader;
