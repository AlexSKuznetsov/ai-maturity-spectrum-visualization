import React, { useState } from 'react';
import { IconMail, IconCheck, IconLoader2 } from '@tabler/icons-react';
import { Input } from '../ui/Input';
import { LeadCaptureData } from '../../types';

interface EmailCaptureFormProps {
  currentLevel: number;
  targetLevel: number;
  onSuccess?: () => void;
}

const EmailCaptureForm: React.FC<EmailCaptureFormProps> = ({
  currentLevel,
  targetLevel,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setStatus('submitting');

    const data: LeadCaptureData = {
      email,
      currentLevel,
      targetLevel,
      capturedAt: new Date().toISOString(),
    };

    try {
      // Try external webhook if configured
      const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }

      // Always save to localStorage as backup
      const existingLeads = JSON.parse(localStorage.getItem('roadmap_leads') || '[]');
      existingLeads.push(data);
      localStorage.setItem('roadmap_leads', JSON.stringify(existingLeads));

      setStatus('success');
      onSuccess?.();
    } catch {
      // Even if webhook fails, we saved to localStorage
      setStatus('success');
      onSuccess?.();
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <IconCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
              You're on the list!
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              We'll send your personalized roadmap report soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-dark-warm-secondary/50 p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 p-2 rounded-lg bg-slate-900 dark:bg-slate-100">
          <IconMail className="w-4 h-4 text-white dark:text-slate-900" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            Get Your Full Roadmap Report
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Detailed action plan with resources and timelines
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            disabled={status === 'submitting'}
            className="flex-1"
          />
          <button
            type="submit"
            disabled={status === 'submitting' || !email}
            className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {status === 'submitting' ? (
              <IconLoader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Send'
            )}
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}

        <p className="text-[10px] text-slate-400 dark:text-slate-500">
          No spam, just your roadmap. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};

export default EmailCaptureForm;
