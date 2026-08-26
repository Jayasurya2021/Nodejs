import React from 'react';

const statusConfig = {
  Wishlist: {
    color: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-400/30',
    dot: 'bg-slate-400',
  },
  Applied: {
    color: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-400/30',
    dot: 'bg-blue-500',
  },
  Screening: {
    color: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-400/30',
    dot: 'bg-cyan-500',
  },
  Interview: {
    color: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-400/30',
    dot: 'bg-purple-500',
  },
  'Technical Round': {
    color: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-400/30',
    dot: 'bg-indigo-500',
  },
  'Final Round': {
    color: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/30',
    dot: 'bg-amber-500',
  },
  Offer: {
    color: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/30',
    dot: 'bg-emerald-500 animate-pulse',
  },
  Rejected: {
    color: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-400/30',
    dot: 'bg-rose-500',
  },
};

const StatusBadge = ({ status, size = 'normal' }) => {
  const config = statusConfig[status] || statusConfig.Applied;

  const sizeClasses = size === 'small' 
    ? 'px-2 py-0.5 text-xs' 
    : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.color} ${sizeClasses} backdrop-blur-xs transition-colors`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
