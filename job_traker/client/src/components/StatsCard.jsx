import React from 'react';

const StatsCard = ({ title, value, subtitle, trend, trendType = 'up', icon: Icon, color = 'indigo', onClick }) => {
  const colorSchemes = {
    indigo: {
      border: 'hover:border-[#4a708b]',
      bgIcon: 'bg-[#f4f0e6] text-[#1f3144] border border-[#d8cebd]',
    },
    blue: {
      border: 'hover:border-[#4a708b]',
      bgIcon: 'bg-[#f4f0e6] text-[#4a708b] border border-[#d8cebd]',
    },
    purple: {
      border: 'hover:border-[#4a708b]',
      bgIcon: 'bg-[#f4f0e6] text-[#1f3144] border border-[#d8cebd]',
    },
    amber: {
      border: 'hover:border-amber-300',
      bgIcon: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    emerald: {
      border: 'hover:border-emerald-300',
      bgIcon: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    },
    rose: {
      border: 'hover:border-rose-300',
      bgIcon: 'bg-rose-50 text-rose-600 border border-rose-100',
    },
  };

  const scheme = colorSchemes[color] || colorSchemes.indigo;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-white border border-[#d8cebd] rounded-2xl p-4.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between ${scheme.border} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div>
        {/* Icon & Title Row */}
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl ${scheme.bgIcon} shadow-2xs shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>

          <div>
            <p className="text-[11px] font-bold text-[#4a708b] leading-tight">
              {title}
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1f3144] tracking-tight mt-0.5">
              {value}
            </h3>
          </div>
        </div>
      </div>

      {/* Bottom Trend or Subtitle Row */}
      <div className="mt-4 pt-2 border-t border-[#d8cebd]/60 flex items-center justify-between">
        {trend ? (
          <div className="flex items-center gap-1 text-[11px] font-extrabold">
            {trendType === 'up' && (
              <span className="text-emerald-600 flex items-center gap-0.5">
                ↑ {trend}
              </span>
            )}
            {trendType === 'neutral' && (
              <span className="text-[#4a708b] flex items-center gap-0.5">
                → {trend}
              </span>
            )}
            {trendType === 'down' && (
              <span className="text-rose-500 flex items-center gap-0.5">
                ↓ {trend}
              </span>
            )}
          </div>
        ) : (
          <p className="text-[11px] font-medium text-[#4a708b]">
            {subtitle || 'All recorded jobs'}
          </p>
        )}

        {/* Mini sparkline curve for Total Applications */}
        {color === 'indigo' && (
          <svg className="w-12 h-5 text-[#4a708b]" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M2 16 L12 12 L22 15 L32 7 L48 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default StatsCard;



