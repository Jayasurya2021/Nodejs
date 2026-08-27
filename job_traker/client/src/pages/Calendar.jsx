import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Briefcase, Clock, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { applicationAPI } from '../services/api';
import StatusBadge from '../components/StatusBadge';

const CalendarPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        const res = await applicationAPI.getApplications();
        if (res.success) {
          setApplications(res.data);
        }
      } catch (err) {
        console.error('Error fetching calendar applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  // Helper to get applications for a specific day in current month
  const getAppsForDay = (day) => {
    if (!day) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return applications.filter((app) => {
      const appApplied = app.appliedDate ? app.appliedDate.split('T')[0] : null;
      const appInterview = app.interviewDate ? app.interviewDate.split('T')[0] : null;
      return appApplied === dateStr || appInterview === dateStr;
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
            <CalendarIcon className="w-4 h-4" /> Application Schedule
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Calendar View
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Track interview dates, application submissions, and follow-ups on a monthly timeline
          </p>
        </div>

        <button
          onClick={() => navigate('/add-application')}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> + Add Application
        </button>
      </div>

      {/* Calendar Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-6">
        {/* Navigation bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-xl font-extrabold text-slate-900">
            {monthNames[month]} {year}
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {daysArray.map((day, idx) => {
            if (!day) {
              return <div key={`empty-${idx}`} className="h-28 rounded-2xl bg-slate-50/40 border border-slate-100/50" />;
            }

            const dayApps = getAppsForDay(day);
            const isToday =
              day === new Date().getDate() &&
              month === new Date().getMonth() &&
              year === new Date().getFullYear();

            return (
              <div
                key={`day-${day}`}
                className={`h-28 p-2 rounded-2xl border transition-all flex flex-col justify-between overflow-y-auto ${
                  isToday
                    ? 'bg-purple-50/50 border-purple-300 ring-2 ring-purple-500/20'
                    : 'bg-white border-slate-200/80 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center ${
                      isToday ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-700'
                    }`}
                  >
                    {day}
                  </span>
                  {dayApps.length > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                      {dayApps.length}
                    </span>
                  )}
                </div>

                <div className="space-y-1 mt-1 flex-1 overflow-y-auto">
                  {dayApps.map((app) => (
                    <div
                      key={app._id}
                      onClick={() => navigate(`/applications/${app._id}`)}
                      className="p-1 px-1.5 rounded-lg bg-slate-100 hover:bg-purple-100 text-[10px] font-bold text-slate-800 truncate cursor-pointer transition-colors"
                      title={`${app.jobRole} at ${app.companyName}`}
                    >
                      {app.companyName}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
