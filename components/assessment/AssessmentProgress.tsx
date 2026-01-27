import React from 'react';

interface AssessmentProgressProps {
  current: number;
  total: number;
}

const AssessmentProgress: React.FC<AssessmentProgressProps> = ({ current, total }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            i < current
              ? 'bg-slate-400 dark:bg-slate-500'
              : i === current
              ? 'bg-slate-900 dark:bg-slate-100 scale-125'
              : 'bg-slate-200 dark:bg-slate-700'
          }`}
        />
      ))}
    </div>
  );
};

export default AssessmentProgress;
