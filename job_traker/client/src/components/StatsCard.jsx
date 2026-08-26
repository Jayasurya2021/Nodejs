import React from 'react';

const StatsCard = ({ title, value, subtitle, icon: Icon, color = 'indigo', onClick }) => {
  const colorSchemes = {
    indigo: {
      border: 'hover:border-indigo-500/50',
      bgIcon: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      gradient: 'from-indigo-500/5 to-transparent',
    },
    emerald: {
      border: 'hover:border-emerald-500/50',
      bgIcon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      gradient: 'from-emerald-500/5 to-transparent',
    },
    purple: {
      border: 'hover:border-purple-500/50',
      bgIcon: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      gradient: 'from-purple-500/5 to-transparent',
    },
    amber: {
      border: 'hover:border-amber-500/50',
      bgIcon: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      gradient: 'from-amber-500/5 to-transparent',
    },
    rose: {
      border: 'hover:border-rose-500/50',
      bgIcon: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      gradient: 'from-rose-500/5 to-transparent',
    },
    blue: {
      border: 'hover:border-blue-500/50',
      bgIcon: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      gradient: 'from-blue-500/5 to-transparent',
    },
  };

  const scheme = colorSchemes[color] || colorSchemes.indigo;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 ${scheme.border} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${scheme.gradient} opacity-50 pointer-events-none`} />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="text-3xl font-extrabold mt-1 text-slate-900 dark:text-slate-100 tracking-tight">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`p-3 rounded-xl ${scheme.bgIcon} transition-transform hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
