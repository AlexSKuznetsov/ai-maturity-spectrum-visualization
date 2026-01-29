import React, { useState, useEffect } from 'react';
import Diagram from '../Diagram';
import { LevelData } from '../../types';
import { AI_LEVELS } from '../../constants';
import DiagramFooterControls from './DiagramFooterControls';
import DiagramHeader from './DiagramHeader';
import MobileLevelList from './MobileLevelList';
import { useAssessmentStore } from '../../store/useAssessmentStore';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

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
  const assessedLevel = useAssessmentStore((state) => state.result?.primaryLevel ?? null);
  const isMobile = useIsMobile();

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-warm text-slate-950 dark:text-slate-50 shadow-sm h-full flex flex-col relative overflow-hidden transition-colors duration-300">
      <DiagramHeader activeLevel={activeLevel} />

      <div className="flex-1 relative min-h-0 flex items-center justify-center p-4">
        {isMobile ? (
          <MobileLevelList
            levels={AI_LEVELS}
            activeLevel={activeLevel}
            assessedLevel={assessedLevel}
            onLevelSelect={onLevelSelect}
          />
        ) : (
          <Diagram activeLevel={activeLevel} assessedLevel={assessedLevel} onLevelSelect={onLevelSelect} />
        )}
      </div>

      {!isMobile && (
        <DiagramFooterControls
          activeLevel={activeLevel}
          levelCount={levelCount}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      )}
    </div>
  );
};

export default DiagramCard;
