import React, { useState } from 'react';
import { IconTrophy, IconMail, IconCheck, IconLoader2, IconUsers } from '@tabler/icons-react';
import { Input } from '../ui/Input';
import { LevelData, LeadCaptureData } from '../../types';

interface Level6StateProps {
  levelData: LevelData;
}

const Level6State: React.FC<Level6StateProps> = ({ levelData }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
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
      currentLevel: 6,
      targetLevel: 6,
      capturedAt: new Date().toISOString(),
    };

    try {
      const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      }

      const existingLeads = JSON.parse(localStorage.getItem('roadmap_leads') || '[]');
      existingLeads.push(data);
      localStorage.setItem('roadmap_leads', JSON.stringify(existingLeads));

      setStatus('success');
    } catch {
      setStatus('success');
    }
  };

  return (
    <div className="text-center space-y-6 py-4">
      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full"
        style={{ backgroundColor: `${levelData.color}20` }}
      >
        <IconTrophy className="w-8 h-8" style={{ color: levelData.color }} />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          You've Reached AI Mastery
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-400 max-w-sm mx-auto">
          Congratulations! You're operating at the highest level of AI maturity.
          Your organization has AI as a core capability.
        </p>
      </div>

      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
        style={{
          backgroundColor: `${levelData.color}15`,
          color: levelData.color,
        }}
      >
        <span className="text-sm font-semibold">Level 6</span>
        <span className="text-sm">AI-Native Platforms</span>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
        {status === 'success' ? (
          <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-4 max-w-sm mx-auto">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <IconCheck className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                  Welcome to the community!
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  We'll be in touch soon.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-sm mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <IconUsers className="w-5 h-5 text-slate-500" />
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Join the AI Leaders Community
              </p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Connect with other Level 6 practitioners, share insights, and stay ahead of emerging trends.
            </p>

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
                    <IconMail className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
            </form>
          </div>
        )}

        <div className="pt-2">
          <a
            href="#partner"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            Interested in partnering? Let's talk
          </a>
        </div>
      </div>
    </div>
  );
};

export default Level6State;
