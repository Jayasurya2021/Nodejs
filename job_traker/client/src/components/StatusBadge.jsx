import React from 'react';

const statusConfig = {
  Wishlist: {
    color: 'bg-[#8eb0c0]/20 text-[#1f3144] border-[#8eb0c0]/40',
    dot: 'bg-[#8eb0c0]',
  },
  Applied: {
    color: 'bg-[#1f3144]/10 text-[#1f3144] border-[#1f3144]/25',
    dot: 'bg-[#1f3144]',
  },
  Screening: {
    color: 'bg-[#4a708b]/15 text-[#1f3144] border-[#4a708b]/30',
    dot: 'bg-[#4a708b]',
  },
  Interview: {
    color: 'bg-[#35526c]/15 text-[#1f3144] border-[#35526c]/30',
    dot: 'bg-[#35526c]',
  },
  'Technical Round': {
    color: 'bg-[#2b4156]/15 text-[#1f3144] border-[#2b4156]/30',
    dot: 'bg-[#2b4156]',
  },
  'Final Round': {
    color: 'bg-amber-50 text-amber-900 border-amber-200',
    dot: 'bg-amber-500',
  },
  Offer: {
    color: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    dot: 'bg-emerald-500 animate-pulse',
  },
  Rejected: {
    color: 'bg-rose-50 text-rose-900 border-rose-200',
    dot: 'bg-rose-500',
  },
};

const StatusBadge = ({ status, size = 'normal' }) => {
  const config = statusConfig[status] || statusConfig.Applied;

  const sizeClasses = size === 'small' 
    ? 'px-2 py-0.5 text-xs font-semibold' 
    : 'px-2.5 py-1 text-xs font-bold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.color} ${sizeClasses} transition-colors shadow-2xs`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;


