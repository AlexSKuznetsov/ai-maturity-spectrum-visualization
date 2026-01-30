import React, { useState, useEffect } from 'react';
import DiagramCard from './components/diagram/DiagramCard';
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';
import InfoPanel from './components/InfoPanel';
import { AssessmentDialog } from './components/assessment';
import { RoadmapDialog } from './components/roadmap';
import { LevelData, AssessmentResult } from './types';
import { AI_LEVELS } from './constants';
import { useAssessmentStore } from './store/useAssessmentStore';
import { Analytics } from "@vercel/analytics/react"

const App: React.FC = () => {
  const savedAssessmentResult = useAssessmentStore((state) => state.result);

  const [activeLevel, setActiveLevel] = useState<LevelData | null>(() => {
    // Initialize with saved result level if exists, otherwise default to first level
    return savedAssessmentResult?.levelData || AI_LEVELS[0];
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const [roadmapResult, setRoadmapResult] = useState<AssessmentResult | null>(null);

  // Sync activeLevel when saved result changes (e.g., on page reload)
  useEffect(() => {
    if (savedAssessmentResult?.levelData) {
      setActiveLevel(savedAssessmentResult.levelData);
    }
  }, [savedAssessmentResult]);

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setActiveLevel(result.levelData);
    setAssessmentOpen(false);
  };

  const handleViewRoadmap = (result: AssessmentResult) => {
    setRoadmapResult(result);
    setAssessmentOpen(false);
    setRoadmapOpen(true);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handlePrevious = () => {
    if (!activeLevel) return;
    const currentIndex = AI_LEVELS.findIndex(l => l.id === activeLevel.id);
    if (currentIndex > 0) {
      setActiveLevel(AI_LEVELS[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (!activeLevel) return;
    const currentIndex = AI_LEVELS.findIndex(l => l.id === activeLevel.id);
    if (currentIndex < AI_LEVELS.length - 1) {
      setActiveLevel(AI_LEVELS[currentIndex + 1]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-dark-warm/50 font-sans text-slate-950 dark:text-slate-50 overflow-hidden transition-colors duration-300">
      <Analytics />
      <AppHeader theme={theme} onToggleTheme={toggleTheme} onOpenAssessment={() => setAssessmentOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row w-full p-4 gap-4 lg:p-6 lg:gap-6 overflow-y-auto lg:overflow-hidden">
        
        {/* Left Column: Visualization */}
        <section className="flex-1 flex flex-col min-h-[500px] lg:min-h-0">
            <DiagramCard
              activeLevel={activeLevel}
              levelCount={AI_LEVELS.length}
              onLevelSelect={setActiveLevel}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
        </section>

        {/* Right Column: Detail Panel */}
        <section className="lg:w-[450px] xl:w-[500px] flex-shrink-0 h-full flex flex-col min-h-0">
            <InfoPanel level={activeLevel} />
        </section>

      </main>

      <AppFooter />

      <AssessmentDialog
        open={assessmentOpen}
        onOpenChange={setAssessmentOpen}
        onComplete={handleAssessmentComplete}
        onViewRoadmap={handleViewRoadmap}
      />

      <RoadmapDialog
        open={roadmapOpen}
        onOpenChange={setRoadmapOpen}
        assessmentResult={roadmapResult}
      />
    </div>
  );
};

export default App;
