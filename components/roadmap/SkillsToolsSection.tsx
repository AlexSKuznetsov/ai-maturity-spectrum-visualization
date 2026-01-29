import React from 'react';
import { IconSchool, IconTools } from '@tabler/icons-react';
import { LevelTransition } from '../../types';

interface SkillsToolsSectionProps {
  transition: LevelTransition;
}

const SkillsToolsSection: React.FC<SkillsToolsSectionProps> = ({ transition }) => {
  const { skillsNeeded, toolsToImplement } = transition;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        Skills & Tools Needed
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <IconSchool className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-400">Skills to Develop</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillsNeeded.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-md bg-slate-100 dark:bg-dark-warm-secondary text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <IconTools className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-400">Tools to Implement</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {toolsToImplement.map((tool, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-md bg-slate-100 dark:bg-dark-warm-secondary text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsToolsSection;
