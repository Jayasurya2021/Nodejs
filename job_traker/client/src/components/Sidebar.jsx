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
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-slate-200/70 z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Mobile Close Button Header */}
          <div className="lg:hidden h-14 px-6 flex items-center justify-between border-b border-slate-100">
            <span className="font-extrabold text-slate-800 text-sm">Navigation</span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
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
                    `flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
                      isActive
                        ? 'bg-emerald-100/90 text-emerald-900 font-extrabold shadow-2xs'
                        : 'text-slate-600 hover:bg-emerald-50/50 hover:text-emerald-900'
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
          {/* Subtle vector background illustration */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-50/80 to-transparent pointer-events-none -z-0" />

          <div className="relative z-10 bg-white border border-emerald-100 rounded-2xl p-4 shadow-2xs text-left">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mb-2">
              <Crown className="w-4 h-4" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">Go Premium</h4>
            <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
              Unlock advanced analytics and smart insights.
            </p>
            <button
              onClick={() => alert('Premium tier features coming soon!')}
              className="mt-3 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-800 hover:from-emerald-700 hover:to-teal-900 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1 transition-all hover:scale-[1.01] cursor-pointer"
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



