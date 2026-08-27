import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  CalendarCheck,
  Video,
  Bookmark,
  Calendar,
  BarChart3,
  Settings,
  Crown,
  X,
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Applications', path: '/applications', icon: Briefcase },
    { label: 'Daily Tracker', path: '/daily-tracker', icon: CalendarCheck },
    { label: 'Interviews', path: '/interviews', icon: Video },
    { label: 'Wishlist', path: '/wishlist', icon: Bookmark },
    { label: 'Calendar', path: '/calendar', icon: Calendar },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#1f3144]/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#f4f0e6] border-r border-[#d8cebd] z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Mobile Close Button Header */}
          <div className="lg:hidden h-14 px-6 flex items-center justify-between border-b border-[#d8cebd]">
            <span className="font-black text-[#1f3144] text-sm">Navigation</span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#4a708b] hover:text-[#1f3144]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                      isActive
                        ? 'bg-[#1f3144] text-[#efe6d5] font-black shadow-md'
                        : 'text-[#4a708b] hover:bg-[#8eb0c0]/20 hover:text-[#1f3144]'
                    }`
                  }
                >
                  <Icon className="w-4.5 h-4.5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Go Premium Card */}
        <div className="p-4 relative overflow-hidden">
          <div className="relative z-10 bg-[#1f3144] border border-[#4a708b] rounded-2xl p-4 shadow-md text-left text-[#efe6d5]">
            <div className="w-8 h-8 rounded-xl bg-[#4a708b]/40 text-[#efe6d5] flex items-center justify-center mb-2">
              <Crown className="w-4 h-4 text-amber-300" />
            </div>
            <h4 className="font-black text-white text-sm">Go Premium</h4>
            <p className="text-[11px] text-[#efe6d5]/80 font-medium mt-1 leading-snug">
              Unlock advanced analytics and smart insights.
            </p>
            <button
              onClick={() => alert('Premium tier features coming soon!')}
              className="mt-3 w-full py-2.5 px-3 rounded-xl bg-[#4a708b] hover:bg-[#3c5d75] text-white font-black text-xs shadow-md flex items-center justify-center gap-1 transition-all hover:scale-[1.01] cursor-pointer"
            >
              Upgrade Now →
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;






