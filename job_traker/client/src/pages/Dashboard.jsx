import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  PlusCircle,
  TrendingUp,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ApplicationCard from '../components/ApplicationCard';
import StatusBadge from '../components/StatusBadge';
import Toast from '../components/Toast';
import { applicationAPI } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await applicationAPI.getStats();
      if (res.success) {
        setStats(res.stats);
      }
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Unable to load dashboard metrics. Please check server connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDelete = async (id, company, role) => {
    if (window.confirm(`Are you sure you want to delete application for ${role} at ${company}?`)) {
      try {
        await applicationAPI.deleteApplication(id);
        setToastMessage(`Deleted application for ${role} at ${company}`);
        fetchDashboardData();
      } catch (err) {
        setToastMessage('Failed to delete application.');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await applicationAPI.updateStatus(id, newStatus);
      setToastMessage(`Status updated to ${newStatus}`);
      fetchDashboardData();
    } catch (err) {
      setToastMessage('Failed to update status.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Loading Dashboard Metrics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center bg-rose-50 border border-rose-200 rounded-3xl my-12 shadow-xs">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h3 className="text-lg font-extrabold text-slate-900">Server Connection Error</h3>
        <p className="text-sm text-slate-600 mt-1 font-medium">{error}</p>
        <button
          onClick={fetchDashboardData}
          className="mt-4 px-5 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 transition-all cursor-pointer shadow-xs"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  const {
    totalApplications = 0,
    appliedToday = 0,
    interviews = 0,
    pending = 0,
    rejected = 0,
    offers = 0,
    statusCounts = {},
    recentApplications = [],
    upcomingInterviews = [],
  } = stats || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Large CTA */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-md border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              SaaS Job Application Tracker
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Track your applications, land your dream role.
            </h1>
            <p className="text-indigo-100 text-sm font-medium">
              Keep full control over your job hunt: observe active interviews, follow-ups, and daily stats in real-time.
            </p>
          </div>

          <button
            onClick={() => navigate('/add-application')}
            className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-indigo-50 text-indigo-900 font-extrabold text-sm shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-5 h-5 text-indigo-600" />
            + Add Job Application
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatsCard
          title="Total Applications"
          value={totalApplications}
          subtitle="All recorded jobs"
          icon={Briefcase}
          color="indigo"
          onClick={() => navigate('/applications')}
        />
        <StatsCard
          title="Applied Today"
          value={appliedToday}
          subtitle="Today's submissions"
          icon={Calendar}
          color="blue"
          onClick={() => navigate('/daily-tracker')}
        />
        <StatsCard
          title="Interviews"
          value={interviews}
          subtitle="Active interview stages"
          icon={Clock}
          color="purple"
          onClick={() => navigate('/interviews')}
        />
        <StatsCard
          title="Pending"
          value={pending}
          subtitle="Awaiting response"
          icon={CheckCircle2}
          color="amber"
          onClick={() => navigate('/applications?status=Applied')}
        />
        <StatsCard
          title="Offers"
          value={offers}
          subtitle="Job offers received"
          icon={Award}
          color="emerald"
          onClick={() => navigate('/applications?status=Offer')}
        />
        <StatsCard
          title="Rejected"
          value={rejected}
          subtitle="Not selected"
          icon={XCircle}
          color="rose"
          onClick={() => navigate('/applications?status=Rejected')}
        />
      </div>

      {/* Grid: Upcoming Interviews & Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Interviews Widget */}
        <div className="lg:col-span-1 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              Upcoming Interviews
            </h3>
            <button
              onClick={() => navigate('/interviews')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {upcomingInterviews.length > 0 ? (
            <div className="space-y-3">
              {upcomingInterviews.slice(0, 3).map((app) => (
                <div
                  key={app._id}
                  onClick={() => navigate(`/applications/${app._id}`)}
                  className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 hover:border-purple-400 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      {app.jobRole}
                    </h4>
                    <StatusBadge status={app.status} size="small" />
                  </div>
                  <p className="text-xs text-slate-600 font-semibold mt-0.5">
                    {app.companyName}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-purple-700 mt-2 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-purple-600" />
                    {new Date(app.interviewDate).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs font-medium">
              No upcoming interviews scheduled right now.
            </div>
          )}
        </div>

        {/* Status Pipeline Statistics Bar */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
          <h3 className="font-extrabold text-slate-900 text-base mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Application Status Breakdown
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(statusCounts).map(([st, count]) => (
              <div
                key={st}
                onClick={() => navigate(`/applications?status=${encodeURIComponent(st)}`)}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer"
              >
                <StatusBadge status={st} size="small" />
                <p className="text-2xl font-black text-slate-900 mt-2.5">
                  {count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Recent Job Applications
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Latest jobs you added to your tracker
            </p>
          </div>

          <button
            onClick={() => navigate('/applications')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            View All Applications <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentApplications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentApplications.map((app) => (
              <ApplicationCard
                key={app._id}
                application={app}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-dashed border-slate-300 rounded-3xl space-y-3">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
            <h4 className="font-extrabold text-slate-800">No applications found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
              Get started by tracking your first job application today!
            </p>
            <button
              onClick={() => navigate('/add-application')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              + Add Job Application
            </button>
          </div>
        )}
      </div>

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default Dashboard;

