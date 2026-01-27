import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/Dialog';
import { AssessmentResult as ResultType } from '../../types';
import { ASSESSMENT_QUESTIONS, calculateResult } from './assessmentData';
import AssessmentProgress from './AssessmentProgress';
import AssessmentQuestion from './AssessmentQuestion';
import AssessmentResult from './AssessmentResult';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface AssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (result: ResultType) => void;
}

const AssessmentDialog: React.FC<AssessmentDialogProps> = ({
  open,
  onOpenChange,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(ASSESSMENT_QUESTIONS.length).fill(null)
  );
  const [result, setResult] = useState<ResultType | null>(null);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isLastQuestion = currentIndex === ASSESSMENT_QUESTIONS.length - 1;
  const canGoBack = currentIndex > 0;
  const canGoNext = currentAnswer !== null;

  const handleSelect = useCallback((levelId: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = levelId;
      return next;
    });
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (!canGoNext) return;

    if (isLastQuestion) {
      // Calculate and show result
      const validAnswers = answers.filter((a): a is number => a !== null);
      const calculatedResult = calculateResult(validAnswers);
      setResult(calculatedResult);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [canGoNext, isLastQuestion, answers]);

  const handleBack = useCallback(() => {
    if (result) {
      // Go back from result to last question
      setResult(null);
    } else if (canGoBack) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [result, canGoBack]);

  const handleRetake = useCallback(() => {
    setCurrentIndex(0);
    setAnswers(new Array(ASSESSMENT_QUESTIONS.length).fill(null));
    setResult(null);
  }, []);

  const handleViewDiagram = useCallback(() => {
    if (result) {
      onComplete(result);
      // Reset state for next time
      setTimeout(() => {
        setCurrentIndex(0);
        setAnswers(new Array(ASSESSMENT_QUESTIONS.length).fill(null));
        setResult(null);
      }, 300);
    }
  }, [result, onComplete]);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      // Reset state when closing
      setTimeout(() => {
        setCurrentIndex(0);
        setAnswers(new Array(ASSESSMENT_QUESTIONS.length).fill(null));
        setResult(null);
      }, 300);
    }
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {result ? 'Your AI Maturity Level' : 'Find Your Level'}
          </DialogTitle>
          <DialogDescription>
            {result
              ? 'Based on your answers, here\'s where you are on the AI maturity spectrum.'
              : 'Answer a few questions to discover your AI maturity level.'}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {result ? (
            <AssessmentResult
              result={result}
              onViewDiagram={handleViewDiagram}
              onRetake={handleRetake}
            />
          ) : (
            <>
              <AssessmentProgress
                current={currentIndex}
                total={ASSESSMENT_QUESTIONS.length}
              />

              <div className="mt-6">
                <AssessmentQuestion
                  question={currentQuestion}
                  selectedLevel={currentAnswer}
                  onSelect={handleSelect}
                />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={!canGoBack}
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                >
                  <IconChevronLeft className="w-4 h-4" />
                  Back
                </button>

                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {currentIndex + 1} / {ASSESSMENT_QUESTIONS.length}
                </span>

                <button
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                >
                  {isLastQuestion ? 'See Result' : 'Next'}
                  <IconChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentDialog;
