import React, { useState, useEffect } from 'react';
import DiagramCard from './components/diagram/DiagramCard';
import AppHeader from './components/layout/AppHeader';
import InfoPanel from './components/InfoPanel';
import { AssessmentDialog } from './components/assessment';
import { LevelData, AssessmentResult } from './types';
import { AI_LEVELS } from './constants';

const App: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<LevelData | null>(AI_LEVELS[0]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [assessmentOpen, setAssessmentOpen] = useState(false);

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setActiveLevel(result.levelData);
    setAssessmentOpen(false);
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

  const handleShare = (platform: 'x' | 'facebook') => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out this AI Maturity Spectrum visualization!');
    
    let shareUrl = '';
    if (platform === 'x') {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-slate-950/50 font-sans text-slate-950 dark:text-slate-50 overflow-hidden transition-colors duration-300">
      <AppHeader theme={theme} onToggleTheme={toggleTheme} onShare={handleShare} onOpenAssessment={() => setAssessmentOpen(true)} />

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

      <AssessmentDialog
        open={assessmentOpen}
        onOpenChange={setAssessmentOpen}
        onComplete={handleAssessmentComplete}
      />
    </div>
  );
};

export default App;
