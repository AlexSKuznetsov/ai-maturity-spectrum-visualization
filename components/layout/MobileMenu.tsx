import React, { useState } from 'react';
import {
  IconMenu2,
  IconX,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandFacebook,
  IconInfoCircle
} from '@tabler/icons-react';
import VersionBadge from './VersionBadge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/Dialog';

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

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
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-warm-secondary rounded-md transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <IconX className="w-5 h-5" /> : <IconMenu2 className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-dark-warm border-b border-slate-200 dark:border-slate-700 shadow-lg z-50">
          <nav className="p-4 space-y-4">
            {/* About */}
            <button
              onClick={() => {
                setAboutOpen(true);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
            >
              <IconInfoCircle className="w-4 h-4" />
              <span className="text-sm font-medium">About</span>
            </button>

            {/* Divider */}
            <div className="h-px bg-slate-200 dark:bg-slate-700" />

            {/* Share */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Share</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare('x')}
                  className="p-2 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-dark-warm-secondary rounded-md transition-colors"
                  title="Share on X"
                >
                  <IconBrandX className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 text-slate-700 dark:text-slate-400 hover:text-[#1877F2] hover:bg-slate-100 dark:hover:bg-dark-warm-secondary rounded-md transition-colors"
                  title="Share on Facebook"
                >
                  <IconBrandFacebook className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-200 dark:bg-slate-700" />

            {/* Links */}
            <div className="flex items-center justify-between">
              <VersionBadge />

              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/AlexSKuznetsov/ai-maturity-spectrum-visualization"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-dark-warm-secondary rounded-md transition-colors"
                  aria-label="View on GitHub"
                >
                  <IconBrandGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/alexskuznetsov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-[#0a66c2] hover:bg-slate-100 dark:hover:bg-dark-warm-secondary rounded-md transition-colors"
                  aria-label="Alex on LinkedIn"
                >
                  <IconBrandLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* About Dialog - controlled separately */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
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
              Use the <strong>Find Your Level</strong> assessment to discover your current AI maturity
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
    </div>
  );
};

export default MobileMenu;
