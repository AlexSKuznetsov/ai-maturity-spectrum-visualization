import React from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../ui/HoverCard';
import { ScrollArea } from '../ui/ScrollArea';

interface ChangelogEntry {
  version: string;
  changes: string[];
}

const changelog: ChangelogEntry[] = [
  {
    version: 'v1.1',
    changes: [
      'Added "Find Your Level" self-assessment feature',
      '6-question questionnaire to identify AI maturity level',
      'Auto-selects matched level on diagram after completion',
    ],
  },
  {
    version: 'v1.0',
    changes: [
      'Initial release',
      'Interactive AI Maturity Spectrum visualization',
      '6 levels from Ad-hoc Assistance to AI-Native Platforms',
      'Dark/light theme support',
      'Social sharing (X, Facebook)',
    ],
  },
];

const currentVersion = changelog[0].version;

const VersionBadge: React.FC = () => {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <span className="hidden sm:inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          {currentVersion}
        </span>
      </HoverCardTrigger>
      <HoverCardContent align="end" className="w-72">
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Changelog
        </div>
        <ScrollArea className="h-48">
          <div className="space-y-4 pr-3">
            {changelog.map((entry) => (
              <div key={entry.version}>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {entry.version}
                </div>
                <ul className="space-y-1">
                  {entry.changes.map((change, index) => (
                    <li
                      key={index}
                      className="text-xs text-slate-600 dark:text-slate-400 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-slate-400 dark:before:text-slate-500"
                    >
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>
      </HoverCardContent>
    </HoverCard>
  );
};

export default VersionBadge;
