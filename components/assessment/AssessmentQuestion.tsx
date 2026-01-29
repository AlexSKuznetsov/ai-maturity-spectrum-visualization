import React from 'react';
import { AssessmentQuestion as QuestionType } from '../../types';

interface AssessmentQuestionProps {
  question: QuestionType;
  selectedLevel: number | null;
  onSelect: (levelId: number) => void;
}

const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({
  question,
  selectedLevel,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 text-center">
        {question.text}
      </h3>
      <div className="space-y-2">
        {question.options.map((option) => {
          const isSelected = selectedLevel === option.levelId;
          return (
            <button
              key={option.levelId}
              onClick={() => onSelect(option.levelId)}
              className={`w-full p-3 text-left rounded-lg border transition-all duration-200 ${
                isSelected
                  ? 'border-2 border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-dark-warm-secondary'
                  : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-warm-secondary/50 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-dark-warm-secondary'
              }`}
            >
              <span
                className={`text-sm ${
                  isSelected
                    ? 'text-slate-900 dark:text-slate-100 font-medium'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AssessmentQuestion;
