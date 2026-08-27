import React from 'react';

const StatsCard = ({ title, value, subtitle, icon: Icon, color = 'indigo', onClick }) => {
  const colorSchemes = {
    indigo: {
      border: 'hover:border-indigo-300',
      bgIcon: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
      gradient: 'from-indigo-50/50 to-transparent',
      text: 'text-indigo-900',
    },
    emerald: {
      border: 'hover:border-emerald-300',
      bgIcon: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      gradient: 'from-emerald-50/50 to-transparent',
      text: 'text-emerald-900',
    },
    purple: {
      border: 'hover:border-purple-300',
      bgIcon: 'bg-purple-50 text-purple-600 border border-purple-100',
      gradient: 'from-purple-50/50 to-transparent',
      text: 'text-purple-900',
    },
    amber: {
      border: 'hover:border-amber-300',
      bgIcon: 'bg-amber-50 text-amber-600 border border-amber-100',
      gradient: 'from-amber-50/50 to-transparent',
      text: 'text-amber-900',
    },
    rose: {
      border: 'hover:border-rose-300',
      bgIcon: 'bg-rose-50 text-rose-600 border border-rose-100',
      gradient: 'from-rose-50/50 to-transparent',
      text: 'text-rose-900',
    },
    blue: {
      border: 'hover:border-blue-300',
      bgIcon: 'bg-blue-50 text-blue-600 border border-blue-100',
      gradient: 'from-blue-50/50 to-transparent',
      text: 'text-blue-900',
    },
  };

  const scheme = colorSchemes[color] || colorSchemes.indigo;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${scheme.border} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${scheme.gradient} pointer-events-none`} />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {title}
          </p>
          <h3 className="text-3xl font-extrabold mt-1 text-slate-900 tracking-tight">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs font-medium text-slate-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`p-3 rounded-xl ${scheme.bgIcon} shadow-xs transition-transform hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

