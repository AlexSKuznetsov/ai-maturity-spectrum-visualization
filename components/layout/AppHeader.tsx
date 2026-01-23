import React from 'react';
import {
  IconBrandLinkedin,
  IconBrandX,
  IconBrandFacebook,
  IconMoon,
  IconSun
} from '@tabler/icons-react';

interface AppHeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onShare: (platform: 'x' | 'facebook') => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ theme, onToggleTheme, onShare }) => {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between flex-shrink-0 z-10 transition-colors duration-300">
      <BrandBadge />
      <div className="flex items-center gap-3">
        <ShareButtons onShare={onShare} />

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

        <ProfileLink />

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

        <span className="hidden sm:inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          v1.0
        </span>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

        <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
      </div>
    </header>
  );
};

const BrandBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-lg bg-slate-900 dark:bg-slate-800 flex items-center justify-center shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-white"
        >
          <path d="M12 2v20" />
          <path d="m17 5-5-3-5 3" />
          <path d="m17 19-5 3-5-3" />
          <path d="M2 12h20" />
        </svg>
      </div>
      <div>
        <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          AI Maturity Spectrum
        </h1>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
          Interactive Framework
        </p>
      </div>
    </div>
  );
};

interface ShareButtonsProps {
  onShare: (platform: 'x' | 'facebook') => void;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ onShare }) => {
  return (
    <div className="flex items-center gap-1 mr-1">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-2 hidden sm:inline">
        Share
      </span>
      <button
        onClick={() => onShare('x')}
        className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
        title="Share on X"
      >
        <IconBrandX className="w-4 h-4" />
      </button>
      <button
        onClick={() => onShare('facebook')}
        className="p-1.5 text-slate-400 hover:text-[#1877F2] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
        title="Share on Facebook"
      >
        <IconBrandFacebook className="w-4 h-4" />
      </button>
    </div>
  );
};

const ProfileLink: React.FC = () => {
  return (
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
      className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <IconMoon className="w-4 h-4" /> : <IconSun className="w-4 h-4" />}
    </button>
  );
};

export default AppHeader;
