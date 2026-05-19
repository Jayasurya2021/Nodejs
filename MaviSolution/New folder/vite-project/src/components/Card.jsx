// GroupCard.jsx

import React from "react";

const GroupCard = ({ groupName = "CSK Cricket Team", icon = "🏏", summary = "Ticket fees: $250.00" }) => {
  return (
    <div className="group bg-[#7AB2B2] rounded-2xl p-8 w-full max-w-[340px] shadow-xl hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border border-white/10">
      <div className="flex items-center justify-between mb-8">
        {/* Top left small rounded icon container */}
        <div className="w-11 h-11 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-xl text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
          {icon}
        </div>
        
        {/* Top right active status dot */}
        <div className="h-2.5 w-2.5 rounded-full bg-[#088395] shadow-[0_0_8px_#088395]" />
      </div>

      <div className="space-y-1.5 mb-8">
        {/* Group Name */}
        <h3 className="text-2xl font-black text-white tracking-tight leading-none group-hover:text-[#09637E] transition-colors duration-300">
          {groupName}
        </h3>
        
        {/* Summary Text */}
        <p className="text-sm text-white/70 font-medium tracking-wide">
          {summary}
        </p>
      </div>

      {/* Divider line */}
      <div className="w-full h-px bg-white/10 mb-6" />

      <div className="flex items-center justify-between">
        {/* Bottom left label */}
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#088395]">
          ACTIVE GROUP
        </span>
        
        {/* Bottom right action */}
        <button className="flex items-center gap-2 text-sm font-black text-[#09637E] group-hover:translate-x-1 transition-all duration-300">
          Details
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
