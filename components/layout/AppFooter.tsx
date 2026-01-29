import React from 'react';
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandFacebook
} from '@tabler/icons-react';
import VersionBadge from './VersionBadge';

const AppFooter: React.FC = () => {
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
    <footer className="bg-white dark:bg-dark-warm border-t border-slate-200 dark:border-slate-700 px-4 lg:px-6 py-3 flex-shrink-0 transition-colors duration-300">
      <div className="flex flex-row items-center justify-between gap-3">
        {/* Version with changelog popover */}
        <div className="flex items-center gap-2">
          <VersionBadge />
          <span className="hidden sm:inline text-xs text-slate-400 dark:text-slate-500">|</span>
          <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400 font-mono">AI Maturity Spectrum</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Share buttons */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline">Share:</span>
            <button
              onClick={() => handleShare('x')}
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-dark-warm-secondary rounded-md transition-colors"
              title="Share on X"
            >
              <IconBrandX className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-1.5 text-slate-400 hover:text-[#1877F2] hover:bg-slate-100 dark:hover:bg-dark-warm-secondary rounded-md transition-colors"
              title="Share on Facebook"
            >
              <IconBrandFacebook className="w-4 h-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>

          {/* GitHub */}
          <a
            href="https://github.com/AlexSKuznetsov/ai-maturity-spectrum-visualization"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-dark-warm-secondary rounded-md transition-colors"
            title="View on GitHub"
          >
            <IconBrandGithub className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
