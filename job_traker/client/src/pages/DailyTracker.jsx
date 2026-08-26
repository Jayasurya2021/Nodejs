import React, { useEffect, useState, useCallback } from 'react';
import { CalendarCheck, Calendar as CalendarIcon, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApplicationCard from '../components/ApplicationCard';
import Toast from '../components/Toast';
import { applicationAPI } from '../services/api';

const DailyTracker = () => {
  const navigate = useNavigate();

  const [dateFilter, setDateFilter] = useState('today');
  const [customDate, setCustomDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchDailyApplications = useCallback(async () => {
    try {
      setLoading(true);
      const params = { dateFilter };
      if (dateFilter === 'custom' && customDate) {
        params.customDate = customDate;
      }
      const res = await applicationAPI.getApplications(params);
      if (res.success) {
        setApplications(res.data);
      }
    } catch (err) {
      console.error('Error loading daily tracker:', err);
      setToastMessage('Error loading daily tracker data.');
    } finally {
      setLoading(false);
    }
  }, [dateFilter, customDate]);

  useEffect(() => {
    fetchDailyApplications();
  }, [fetchDailyApplications]);

  const handleDelete = async (id, company, role) => {
    if (window.confirm(`Delete application for ${role} at ${company}?`)) {
      try {
        await applicationAPI.deleteApplication(id);
        setToastMessage('Deleted application');
        setApplications((prev) => prev.filter((app) => app._id !== id));
      } catch (err) {
        setToastMessage('Failed to delete application.');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await applicationAPI.updateStatus(id, newStatus);
      setToastMessage(`Status updated to ${newStatus}`);
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      setToastMessage('Failed to update status.');
    }
  };

  // Activity breakdown calculation for selected view
  const appliedCount = applications.filter((a) => a.status === 'Applied' || a.status === 'Wishlist').length;
  const interviewCount = applications.filter((a) =>
    ['Interview', 'Technical Round', 'Final Round'].includes(a.status)
  ).length;
  const offerCount = applications.filter((a) => a.status === 'Offer').length;

  const filterLabels = {
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    custom: 'Custom Date',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              <CalendarCheck className="w-4 h-4" /> Daily Activity Tracker
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </h1>
          </div>

          {/* Preset Date Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {['today', 'yesterday', 'thisWeek', 'thisMonth', 'custom'].map((f) => (
              <button
                key={f}
                onClick={() => setDateFilter(f)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  dateFilter === f
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {filterLabels[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Date Input if selected */}
        {dateFilter === 'custom' && (
          <div className="mt-4 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-sm">
            <CalendarIcon className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="bg-transparent text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>
        )}

        {/* Daily Summary Stats Pill Box */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Applications
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-indigo-900 dark:text-indigo-100 mt-1">
              {applications.length}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/60 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Interviews
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-900 dark:text-purple-100 mt-1">
              {interviewCount}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Offers
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-900 dark:text-emerald-100 mt-1">
              {offerCount}
            </p>
          </div>
        </div>
      </div>

      {/* Applications List for Selected Date */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Activity Log ({applications.length})
          </h2>
          <button
            onClick={() => navigate('/add-application')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Log New Application
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[30vh]">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : applications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <ApplicationCard
                key={app._id}
                application={app}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-2">
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              No application activity recorded for this period.
            </p>
            <p className="text-xs text-slate-500">
              Select another filter or add job applications submitted on this day.
            </p>
          </div>
        )}
      </div>

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default DailyTracker;
