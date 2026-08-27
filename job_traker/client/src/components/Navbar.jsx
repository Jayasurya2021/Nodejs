import React from 'react';
import { Menu, Plus, Bell, Search, Moon, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onToggleSidebar, searchTerm = '', setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 sticky top-0 z-30 bg-[#f0ece1]/90 backdrop-blur-md border-b border-[#d8d2c4] px-4 lg:px-8 flex items-center justify-between transition-colors shadow-2xs">
      {/* Left Logo Brand & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-[#e6e1d3] transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#000000] text-[#e6e1d3] flex items-center justify-center shadow-md shadow-black/20 group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5 text-[#e6e1d3]" />
          </div>
          <div>
            <h1 className="font-black text-[#000000] text-base leading-tight tracking-tight">
              Job Tracker
            </h1>
            <p className="text-[10px] font-extrabold text-[#3d2d1d] tracking-wider uppercase">
              Track. Apply. Achieve.
            </p>
          </div>
        </div>
      </div>

      {/* Middle Wide Search Input */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3d2d1d]/60" />
          <input
            type="text"
            placeholder="Search applications, companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/80 border border-[#d8d2c4] text-xs text-[#000000] placeholder-[#3d2d1d]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3d2d1d]/20 focus:border-[#3d2d1d] transition-all font-semibold"
          />
        </div>
      </div>

      {/* Right Header Controls */}
      <div className="flex items-center gap-3">
        {/* + Add Application Primary Button */}
        <button
          onClick={() => navigate('/add-application')}
          className="px-4 py-2 rounded-xl bg-[#1c1611] hover:bg-[#000000] text-[#e6e1d3] font-bold text-xs shadow-md shadow-black/20 flex items-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#e6e1d3]" />
          <span>+ Add Application</span>
        </button>

        {/* Theme Toggle Icon (Moon) */}
        <button
          className="p-2 rounded-xl text-[#3d2d1d] hover:text-[#000000] hover:bg-[#e6e1d3] transition-colors cursor-pointer"
          title="Light Warm Theme Active"
        >
          <Moon className="w-4.5 h-4.5" />
        </button>

        {/* Bell Notification Badge */}
        <button
          className="relative p-2 rounded-xl text-[#3d2d1d] hover:text-[#000000] hover:bg-[#e6e1d3] transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#3d2d1d] text-[#e6e1d3] font-black text-[9px] flex items-center justify-center border-2 border-[#f0ece1]">
            3
          </span>
        </button>

        {/* User Profile Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#d8d2c4]">
          <div className="w-8 h-8 rounded-full bg-[#1c1611] text-[#e6e1d3] font-bold text-xs flex items-center justify-center shadow-2xs">
            JS
          </div>
          <div className="hidden lg:block text-left leading-tight">
            <p className="text-xs font-black text-[#000000]">Jayasurya</p>
            <p className="text-[10px] text-[#3d2d1d] font-bold">Job Seeker</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;




