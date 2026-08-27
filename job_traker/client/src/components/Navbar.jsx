import React from 'react';
import { Menu, Plus, Bell, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 flex items-center justify-between transition-colors shadow-2xs">
      {/* Left Menu & Quick Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-semibold text-emerald-700">
            Live Application Tracker
          </span>
        </div>
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Add Button */}
        <button
          onClick={() => navigate('/add-application')}
          className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm shadow-indigo-600/20 flex items-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
          title="Add Application"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">+ Add Application</span>
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            JS
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-extrabold text-slate-800 leading-none">
              Jayasurya
            </p>
            <p className="text-[10px] font-medium text-slate-500 mt-0.5">Job Seeker</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

