import React from 'react';
import { IconInfoHexagon } from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/Dialog';

const InfoDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          type="button"
        >
          <IconInfoHexagon className="h-4 w-4 text-slate-500 dark:text-slate-300" />
          Info
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About the AI Maturity Spectrum</DialogTitle>
          <DialogDescription>
            A quick guide to what you see here and how it helps you plan AI adoption.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>
            This visualization maps the progression of AI adoption from basic prompting to fully
            autonomous systems. Each block is a maturity level, and the diagonal path shows how
            complexity and engineering involvement increase together.
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
  );
};

export default InfoDialog;
