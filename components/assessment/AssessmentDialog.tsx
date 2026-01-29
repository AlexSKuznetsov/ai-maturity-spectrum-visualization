import React, { useState, useCallback, useEffect } from 'react';
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
import { useAssessmentStore } from '../../store/useAssessmentStore';

interface AssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (result: ResultType) => void;
  onViewRoadmap: (result: ResultType) => void;
}

const AssessmentDialog: React.FC<AssessmentDialogProps> = ({
  open,
  onOpenChange,
  onComplete,
  onViewRoadmap,
}) => {
  const { result: savedResult, setResult: saveResult, clearResult } = useAssessmentStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(ASSESSMENT_QUESTIONS.length).fill(null)
  );
  const [result, setResult] = useState<ResultType | null>(null);
  const [isRetaking, setIsRetaking] = useState(false);

  // Load saved result when dialog opens
  useEffect(() => {
    if (open && savedResult && !isRetaking) {
      setResult(savedResult);
    }
  }, [open, savedResult, isRetaking]);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isLastQuestion = currentIndex === ASSESSMENT_QUESTIONS.length - 1;
  const canGoBack = currentIndex > 0 || (result && isRetaking);
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
      saveResult(calculatedResult); // Persist to localStorage
      setIsRetaking(false);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [canGoNext, isLastQuestion, answers, saveResult]);

  const handleBack = useCallback(() => {
    if (result && isRetaking) {
      // Go back from result to last question (only if retaking)
      setResult(null);
    } else if (canGoBack && !result) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [result, canGoBack, isRetaking]);

  const handleRetake = useCallback(() => {
    clearResult(); // Clear from localStorage
    setCurrentIndex(0);
    setAnswers(new Array(ASSESSMENT_QUESTIONS.length).fill(null));
    setResult(null);
    setIsRetaking(true);
  }, [clearResult]);

  const handleViewDiagram = useCallback(() => {
    if (result) {
      onComplete(result);
      // Reset local state but keep store intact
      setTimeout(() => {
        setCurrentIndex(0);
        setAnswers(new Array(ASSESSMENT_QUESTIONS.length).fill(null));
        setResult(null);
        setIsRetaking(false);
      }, 300);
    }
  }, [result, onComplete]);

  const handleViewRoadmap = useCallback(() => {
    if (result) {
      onViewRoadmap(result);
    }
  }, [result, onViewRoadmap]);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      // Reset local state when closing (but keep store intact)
      setTimeout(() => {
        setCurrentIndex(0);
        setAnswers(new Array(ASSESSMENT_QUESTIONS.length).fill(null));
        setResult(null);
        setIsRetaking(false);
      }, 300);
    }
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {result ? 'Your AI Maturity Level' : 'Find your level'}
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
              onViewRoadmap={handleViewRoadmap}
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
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-50 disabled:pointer-events-none transition-colors"
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
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200 disabled:opacity-50 disabled:pointer-events-none transition-colors"
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
