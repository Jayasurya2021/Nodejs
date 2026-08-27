import React from 'react';
import { Menu, Plus, Bell, Search, Moon, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onToggleSidebar, searchTerm = '', setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 sticky top-0 z-30 bg-white border-b border-slate-200/70 px-4 lg:px-8 flex items-center justify-between transition-colors shadow-2xs">
      {/* Left Logo Brand & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-black text-slate-900 text-base leading-tight tracking-tight">
              Job Tracker
            </h1>
            <p className="text-[10px] font-bold text-purple-600 tracking-wider">
              Track. Apply. Achieve.
            </p>
          </div>
        </div>
      </div>

      {/* Middle Wide Search Input */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search applications, companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200/80 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
          />
        </div>
      </div>

      {/* Right Header Controls */}
      <div className="flex items-center gap-3">
        {/* + Add Application Primary Button */}
        <button
          onClick={() => navigate('/add-application')}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 flex items-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Application</span>
        </button>

        {/* Theme Toggle Icon (Moon) */}
        <button
          className="p-2 rounded-xl text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
          title="Light Theme Active"
        >
          <Moon className="w-4.5 h-4.5" />
        </button>

        {/* Bell Notification Badge */}
        <button
          className="relative p-2 rounded-xl text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-purple-600 text-white font-black text-[9px] flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>

        {/* User Profile Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            JS
          </div>
          <div className="hidden lg:block text-left leading-tight">
            <p className="text-xs font-bold text-slate-800">Jayasurya</p>
            <p className="text-[10px] text-slate-400 font-medium">Job Seeker</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


