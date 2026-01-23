import React, { useState, useEffect } from 'react';
import Diagram from './components/Diagram';
import InfoPanel from './components/InfoPanel';
import { LevelData } from './types';
import { AI_LEVELS } from './constants';
import { 
  IconChevronLeft, 
  IconChevronRight, 
  IconBrandLinkedin, 
  IconBrandX, 
  IconBrandFacebook,
  IconMoon,
  IconSun
} from '@tabler/icons-react';

const App: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<LevelData | null>(AI_LEVELS[0]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

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
    const text = encodeURIComponent("Check out this AI Maturity Spectrum visualization!");
    
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
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between flex-shrink-0 z-10 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-slate-900 dark:bg-slate-800 flex items-center justify-center shadow-sm">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/></svg>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              AI Maturity Spectrum
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Interactive Framework</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            {/* Share Buttons */}
            <div className="flex items-center gap-1 mr-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-2 hidden sm:inline">Share</span>
              <button 
                onClick={() => handleShare('x')}
                className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                title="Share on X"
              >
                <IconBrandX className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleShare('facebook')}
                className="p-1.5 text-slate-400 hover:text-[#1877F2] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                title="Share on Facebook"
              >
                <IconBrandFacebook className="w-4 h-4" />
              </button>
            </div>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

            {/* LinkedIn Profile */}
            <a 
              href="https://www.linkedin.com/in/alexskuznetsov/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 p-1.5 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#0a66c2] dark:hover:text-[#0a66c2] transition-colors"
              aria-label="Alex on LinkedIn"
            >
              <IconBrandLinkedin className="w-5 h-5 group-hover:text-[#0a66c2] transition-colors" />
              <span className="text-sm font-medium">Alex</span>
            </a>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
            
            <span className="hidden sm:inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                v1.0
            </span>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <IconMoon className="w-4 h-4" /> : <IconSun className="w-4 h-4" />}
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row w-full p-4 gap-4 lg:p-6 lg:gap-6 overflow-y-auto lg:overflow-hidden">
        
        {/* Left Column: Visualization */}
        <section className="flex-1 flex flex-col min-h-[500px] lg:min-h-0">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-50 shadow-sm h-full flex flex-col relative overflow-hidden transition-colors duration-300">
                {/* Card Header with Status */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col space-y-1.5">
                        <h3 className="font-semibold leading-none tracking-tight text-lg">Maturity Map</h3>
                        <p className="text-md text-slate-500 dark:text-slate-400">Interactive diagram of AI adoption levels.</p>
                    </div>
                    
                    {/* Engineering Involvement Status - Moved Here */}
                    {activeLevel && (
                        <div className="hidden sm:flex flex-col items-end">
                             <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 flex flex-col items-end shadow-sm">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Engineering Involvement</span>
                                <div className="flex items-center gap-2">
                                     <div className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: activeLevel.color }} />
                                     <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        {activeLevel.engineeringInvolvement[0]}
                                     </span>
                                </div>
                             </div>
                        </div>
                    )}
                </div>

                {/* Diagram Area */}
                <div className="flex-1 relative min-h-0 flex items-center justify-center p-4">
                   <Diagram activeLevel={activeLevel} onLevelSelect={setActiveLevel} />
                </div>

                {/* Footer with Controls */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50 flex items-center justify-between z-10">
                     <button
                        onClick={handlePrevious}
                        disabled={!activeLevel || activeLevel.id === 1}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:text-slate-200 h-9 px-4 py-2 shadow-sm"
                     >
                        <IconChevronLeft className="mr-2 h-4 w-4" />
                        Previous
                     </button>
                     
                     <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        Level {activeLevel?.id || '-'} / {AI_LEVELS.length}
                     </span>

                     <button
                        onClick={handleNext}
                        disabled={!activeLevel || activeLevel.id === AI_LEVELS.length}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-900/90 dark:hover:bg-slate-200 h-9 px-4 py-2 shadow-sm"
                     >
                        Next
                        <IconChevronRight className="ml-2 h-4 w-4" />
                     </button>
                </div>
            </div>
        </section>

        {/* Right Column: Detail Panel */}
        <section className="lg:w-[450px] xl:w-[500px] flex-shrink-0 h-full flex flex-col min-h-0">
            <InfoPanel level={activeLevel} />
        </section>

      </main>
    </div>
  );
};

export default App;