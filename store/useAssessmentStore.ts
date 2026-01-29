import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AssessmentResult } from '../types';
import { ASSESSMENT_VERSION } from '../components/assessment/assessmentData';

interface AssessmentState {
  result: AssessmentResult | null;
  completedAt: string | null;
  frameworkVersion: string | null;
  setResult: (result: AssessmentResult) => void;
  clearResult: () => void;
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
      result: null,
      completedAt: null,
      frameworkVersion: null,
      setResult: (result) => set({
        result,
        completedAt: new Date().toISOString(),
        frameworkVersion: ASSESSMENT_VERSION,
      }),
      clearResult: () => set({
        result: null,
        completedAt: null,
        frameworkVersion: null,
      }),
    }),
    {
      name: 'ai-maturity-assessment',
      // Validate version on rehydration - clear result if version mismatch
      onRehydrateStorage: () => (state) => {
        if (state && state.frameworkVersion !== ASSESSMENT_VERSION) {
          // Version mismatch - clear the stored result
          state.clearResult();
        }
      },
    }
  )
);
