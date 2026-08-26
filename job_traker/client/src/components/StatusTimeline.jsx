import React from 'react';
import { Check, XCircle } from 'lucide-react';

const STAGES = [
  'Wishlist',
  'Applied',
  'Screening',
  'Interview',
  'Technical Round',
  'Final Round',
  'Offer',
];

const StatusTimeline = ({ currentStatus, onSelectStatus }) => {
  const isRejected = currentStatus === 'Rejected';
  const currentIndex = STAGES.indexOf(currentStatus);

  return (
    <div className="w-full py-4 overflow-x-auto">
      <div className="min-w-[640px] flex items-center justify-between relative px-4">
        {/* Background Connector Line */}
        <div className="absolute left-8 right-8 top-5 h-1 bg-slate-200 dark:bg-slate-800 -z-0" />

        {/* Highlighted Active Progress Line */}
        {!isRejected && currentIndex >= 0 && (
          <div
            className="absolute left-8 top-5 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-500 -z-0"
            style={{
              width: `${(currentIndex / (STAGES.length - 1)) * 90}%`,
            }}
          />
        )}

        {STAGES.map((stage, idx) => {
          const isPassed = !isRejected && currentIndex >= 0 && idx < currentIndex;
          const isCurrent = currentStatus === stage;

          return (
            <div
              key={stage}
              className="flex flex-col items-center relative z-10 group cursor-pointer"
              onClick={() => onSelectStatus && onSelectStatus(stage)}
            >
              {/* Circle Node */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/30 scale-110 shadow-lg shadow-indigo-500/20'
                    : isPassed
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 group-hover:border-indigo-400'
                }`}
              >
                {isPassed ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Stage Label */}
              <span
                className={`mt-2.5 text-xs font-medium text-center transition-colors max-w-[80px] ${
                  isCurrent
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                    : isPassed
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {stage}
              </span>
            </div>
          );
        })}

        {/* Rejected Special Badge */}
        {isRejected && (
          <div
            className="flex flex-col items-center relative z-10 cursor-pointer"
            onClick={() => onSelectStatus && onSelectStatus('Rejected')}
          >
            <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center ring-4 ring-rose-500/30 scale-110 shadow-lg">
              <XCircle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="mt-2.5 text-xs font-bold text-rose-500">
              Rejected
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusTimeline;
