import React from 'react';
import { IconCalendar, IconArrowRight } from '@tabler/icons-react';

interface StrategyCTAProps {
  bookingUrl?: string;
}

const StrategyCTA: React.FC<StrategyCTAProps> = ({ bookingUrl = '#book-session' }) => {
  return (
    <div className="rounded-lg border-2 border-slate-900 dark:border-slate-100 bg-slate-900 dark:bg-slate-100 p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 rounded-lg bg-white dark:bg-dark-warm">
          <IconCalendar className="w-5 h-5 text-slate-900 dark:text-slate-100" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white dark:text-slate-900 mb-1">
            Book a Free Strategy Session
          </p>
          <p className="text-xs text-slate-300 dark:text-slate-700 mb-3">
            30 minutes to accelerate your AI maturity journey with personalized guidance
          </p>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-dark-warm text-slate-900 dark:text-slate-100 text-sm font-medium hover:bg-slate-100 dark:hover:bg-dark-warm-secondary transition-colors"
          >
            Book Now
            <IconArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default StrategyCTA;
