import React from 'react';
import { Menu, Plus, Bell, Search, Moon, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onToggleSidebar, searchTerm = '', setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 sticky top-0 z-30 bg-[#efe9e3]/90 backdrop-blur-md border-b border-[#d9d2c9] px-4 lg:px-8 flex items-center justify-between transition-colors shadow-2xs">
      {/* Left Logo Brand & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-[#2b2621] hover:bg-[#d9d2c9]/60 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#c4b49f] text-[#2b2621] flex items-center justify-center shadow-md shadow-[#c4b49f]/30 group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5 text-[#2b2621]" />
          </div>
          <div>
            <h1 className="font-black text-[#2b2621] text-base leading-tight tracking-tight">
              Job Tracker
            </h1>
            <p className="text-[10px] font-extrabold text-[#5c5247] tracking-wider uppercase">
              Track. Apply. Achieve.
            </p>
          </div>
        </div>
      </div>

      {/* Middle Wide Search Input */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c5247]" />
          <input
            type="text"
            placeholder="Search applications, companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#faf9f6] border border-[#d9d2c9] text-xs text-[#2b2621] placeholder-[#5c5247]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c4b49f]/30 focus:border-[#c4b49f] transition-all font-semibold"
          />
        </div>
      </div>

      {/* Right Header Controls */}
      <div className="flex items-center gap-3">
        {/* + Add Application Primary Button */}
        <button
          onClick={() => navigate('/add-application')}
          className="px-4 py-2 rounded-xl bg-[#2b2621] hover:bg-[#1a1714] text-[#faf9f6] font-bold text-xs shadow-md shadow-[#2b2621]/20 flex items-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#faf9f6]" />
          <span>+ Add Application</span>
        </button>

        {/* Theme Toggle Icon (Moon) */}
        <button
          className="p-2 rounded-xl text-[#5c5247] hover:text-[#2b2621] hover:bg-[#d9d2c9]/50 transition-colors cursor-pointer"
          title="Light Warm Sand Theme Active"
        >
          <Moon className="w-4.5 h-4.5" />
        </button>

        {/* Bell Notification Badge */}
        <button
          className="relative p-2 rounded-xl text-[#5c5247] hover:text-[#2b2621] hover:bg-[#d9d2c9]/50 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#c4b49f] text-[#2b2621] font-black text-[9px] flex items-center justify-center border-2 border-[#efe9e3]">
            3
          </span>
        </button>

        {/* User Profile Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#d9d2c9]">
          <div className="w-8 h-8 rounded-full bg-[#c4b49f] text-[#2b2621] font-black text-xs flex items-center justify-center shadow-2xs">
            JS
          </div>
          <div className="hidden lg:block text-left leading-tight">
            <p className="text-xs font-black text-[#2b2621]">Jayasurya</p>
            <p className="text-[10px] text-[#5c5247] font-bold">Job Seeker</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;





