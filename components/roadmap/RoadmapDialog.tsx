import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/Dialog';
import { ScrollArea } from '../ui/ScrollArea';
import { AssessmentResult } from '../../types';
import { AI_LEVELS } from '../../constants';
import { getTransitionForLevel } from './roadmapData';
import RoadmapHeader from './RoadmapHeader';
import GapAnalysisCard from './GapAnalysisCard';
import ActionItemsList from './ActionItemsList';
import SkillsToolsSection from './SkillsToolsSection';
import EmailCaptureForm from './EmailCaptureForm';
import StrategyCTA from './StrategyCTA';
import Level6State from './Level6State';

interface RoadmapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentResult: AssessmentResult | null;
}

const RoadmapDialog: React.FC<RoadmapDialogProps> = ({
  open,
  onOpenChange,
  assessmentResult,
}) => {
  if (!assessmentResult) return null;

  const { primaryLevel, levelData } = assessmentResult;
  const transition = getTransitionForLevel(primaryLevel);
  const targetLevel = transition ? AI_LEVELS.find(l => l.id === transition.toLevel) : null;
  const isLevel6 = primaryLevel >= 6;

  const bookingUrl = import.meta.env.VITE_CALENDLY_URL || '#book-session';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[85vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>Level-Up Roadmap</DialogTitle>
          <DialogDescription>
            Your personalized path to the next AI maturity level
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-6">
            {isLevel6 ? (
              <Level6State levelData={levelData} />
            ) : transition && targetLevel ? (
              <div className="space-y-6">
                <RoadmapHeader
                  currentLevel={levelData}
                  targetLevel={targetLevel}
                />

                <div className="border-t border-slate-200 dark:border-slate-700" />

                <GapAnalysisCard transition={transition} />

                <ActionItemsList transition={transition} />

                <SkillsToolsSection transition={transition} />
                
                {/* Uncomment when ready */}
                {/* <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                  <EmailCaptureForm
                    currentLevel={primaryLevel}
                    targetLevel={transition.toLevel}
                  />

                  <StrategyCTA bookingUrl={bookingUrl} />
                </div> */}
              </div>
            ) : null}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RoadmapDialog;
