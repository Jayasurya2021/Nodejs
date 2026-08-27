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
          className="fixed inset-0 bg-[#2b2621]/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#efe9e3] border-r border-[#d9d2c9] z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Mobile Close Button Header */}
          <div className="lg:hidden h-14 px-6 flex items-center justify-between border-b border-[#d9d2c9]">
            <span className="font-black text-[#2b2621] text-sm">Navigation</span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#5c5247] hover:text-[#2b2621]"
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
                        ? 'bg-[#2b2621] text-[#efe9e3] font-black shadow-md'
                        : 'text-[#5c5247] hover:bg-[#d9d2c9]/60 hover:text-[#2b2621]'
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
          <div className="relative z-10 bg-[#faf9f6] border border-[#d9d2c9] rounded-2xl p-4 shadow-xs text-left">
            <div className="w-8 h-8 rounded-xl bg-[#c4b49f]/30 border border-[#c4b49f]/40 text-[#2b2621] flex items-center justify-center mb-2">
              <Crown className="w-4 h-4 text-amber-600" />
            </div>
            <h4 className="font-black text-[#2b2621] text-sm">Go Premium</h4>
            <p className="text-[11px] text-[#5c5247] font-medium mt-1 leading-snug">
              Unlock advanced analytics and smart insights.
            </p>
            <button
              onClick={() => alert('Premium tier features coming soon!')}
              className="mt-3 w-full py-2.5 px-3 rounded-xl bg-[#c4b49f] hover:bg-[#b5a38c] text-[#2b2621] font-black text-xs shadow-xs flex items-center justify-center gap-1 transition-all hover:scale-[1.01] cursor-pointer"
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





