import React from 'react';
import {
  IconBrandLinkedin,
  IconMoon,
  IconSun,
  IconTargetArrow,
  IconInfoCircle
} from '@tabler/icons-react';
import MobileMenu from './MobileMenu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/Dialog';

interface AppHeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenAssessment: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ theme, onToggleTheme, onOpenAssessment }) => {
  return (
    <header className="relative bg-white dark:bg-dark-warm border-b border-slate-200 dark:border-slate-700 px-4 lg:px-6 py-3 flex items-center justify-between flex-shrink-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <BrandBadge />
        <AboutDialog />
      </div>
      <div className="flex items-center gap-3">
        {/* Always visible: CTA + Theme */}
        <button
          onClick={onOpenAssessment}
          className="inline-flex items-center gap-2 rounded-md bg-slate-900 dark:bg-slate-100 px-3 py-1.5 text-sm font-medium text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors shadow-sm"
        >
          <IconTargetArrow className="h-4 w-4" />
          <span className="hidden sm:inline">Find your level</span>
        </button>

        <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

        {/* Desktop only - LinkedIn */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
          <ProfileLink />
        </div>

        {/* Mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

const BrandBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-lg bg-slate-900 dark:bg-dark-warm-secondary flex items-center justify-center shadow-sm overflow-hidden">
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <rect x="2" y="10" width="3" height="10" fill="#3b82f6" rx="1" />
          <rect x="6" y="7" width="3" height="13" fill="#0ea5e9" rx="1" />
          <rect x="10" y="4" width="3" height="16" fill="#10b981" rx="1" />
          <rect x="14" y="6" width="3" height="14" fill="#f59e0b" rx="1" />
          <rect x="18" y="9" width="3" height="11" fill="#ef4444" rx="1" />
        </svg>
      </div>
      <div>
        <h1 className="text-sm font-semibold font-mono text-slate-900 dark:text-slate-100 tracking-tight">
          AI Maturity Spectrum
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Interactive Framework
        </p>
      </div>
    </div>
  );
};

const ProfileLink: React.FC = () => {
  return (
    <a
      href="https://www.linkedin.com/in/alexskuznetsov/"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-1.5 p-1.5 rounded-md text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-warm-secondary hover:text-[#0a66c2] dark:hover:text-[#0a66c2] transition-colors"
      aria-label="Alex on LinkedIn"
    >
      <IconBrandLinkedin className="w-5 h-5 group-hover:text-[#0a66c2] transition-colors" />
      <span className="text-sm font-medium">Alex</span>
    </a>
  );
};

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggleTheme }) => {
  return (
    <button
      onClick={onToggleTheme}
      className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-dark-warm-secondary rounded-md transition-colors"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <IconMoon className="w-4 h-4" /> : <IconSun className="w-4 h-4" />}
    </button>
  );
};

const AboutDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="hidden lg:inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-warm-secondary px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          type="button"
        >
          <IconInfoCircle className="h-3.5 w-3.5" />
          About
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About the AI Maturity Spectrum</DialogTitle>
          <DialogDescription>
            A quick guide to what you see here and how it helps you plan AI adoption.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <p>
            This visualization maps the progression of AI adoption from basic prompting to fully
            autonomous systems. Each block is a maturity level, and the diagonal path shows how
            complexity and engineering involvement increase together.
          </p>
          <p>
            Use the <strong>Find your level</strong> assessment to discover your current AI maturity
            stage. Answer a few questions about your team's practices and get a personalized roadmap
            showing the path to your next level.
          </p>
          <p>
            Select any level in the diagram to see detailed characteristics on the right. Use the
            transition marker to identify where tooling stops being enough and custom engineering
            becomes essential.
          </p>
          <p>
            Use this view to align teams on current capability, compare risk, and plan the next
            step in your AI roadmap.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppHeader;
