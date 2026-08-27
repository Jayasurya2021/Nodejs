import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  PlusCircle,
  TrendingUp,
  ArrowRight,
  Sparkles,
  AlertCircle,
  MoreVertical,
  Target,
  CheckSquare,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import StatsCard from '../components/StatsCard';
import StatusBadge from '../components/StatusBadge';
import Toast from '../components/Toast';
import { applicationAPI } from '../services/api';

const STATUS_COLORS = {
  Wishlist: '#34d399',       // Emerald Mint
  Applied: '#059669',        // Emerald Green
  Screening: '#0f766e',      // Teal Emerald
  Interview: '#047857',      // Forest Green
  'Technical Round': '#065f46', // Dark Forest
  'Final Round': '#f59e0b',  // Amber
  Offer: '#10b981',          // Emerald Accent
  Rejected: '#f43f5e',       // Rose
};

// Generate logo avatar fallback background color
const getAvatarBg = (name = '') => {
  const colors = [
    'bg-emerald-700',
    'bg-teal-700',
    'bg-emerald-600',
    'bg-emerald-800',
    'bg-amber-600',
    'bg-rose-600',
    'bg-cyan-700',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
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

  // Donut chart data & percentage calculations
  const totalCountForChart = totalApplications > 0 ? totalApplications : 1;
  const statusPieData = Object.entries(statusCounts).map(([statusName, count]) => ({
    name: statusName,
    value: count,
    percentage: ((count / totalCountForChart) * 100).toFixed(1),
    color: STATUS_COLORS[statusName] || '#059669',
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 3D Forest Green Curved Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-950 via-emerald-900 to-teal-950 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2 leading-tight">
              Good morning, Jayasurya! 👋
            </h1>
            <p className="text-emerald-100 text-sm font-medium">
              Stay consistent, track smart, and land your dream role.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-100 shadow-2xs">
              <span>You've applied to {totalApplications} jobs this month</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
            </div>
          </div>

          {/* 3D Illustration Graphic Composition */}
          <div className="relative flex items-center justify-center shrink-0 pr-4">
            <div className="w-48 h-32 relative flex items-center justify-center">
              {/* 3D Briefcase Card */}
              <div className="absolute left-2 top-2 w-24 h-24 bg-gradient-to-tr from-emerald-600 to-teal-800 rounded-2xl shadow-2xl rotate-[-6deg] flex items-center justify-center border border-white/30 backdrop-blur-xs">
                <Briefcase className="w-10 h-10 text-white stroke-[1.5]" />
              </div>
              {/* Target Graphic */}
              <div className="absolute right-4 bottom-0 w-20 h-20 bg-gradient-to-tr from-teal-700 to-emerald-500 rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
                <Target className="w-9 h-9 text-white" />
              </div>
              {/* Checklist Sheet */}
              <div className="absolute right-10 top-0 w-16 h-20 bg-white rounded-xl shadow-lg rotate-[8deg] p-2 flex flex-col justify-between">
                <CheckSquare className="w-5 h-5 text-emerald-700" />
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-emerald-200 rounded-full" />
                  <div className="h-1.5 w-3/4 bg-emerald-200 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid (Row of 6 Cards with Trends) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatsCard
          title="Total Applications"
          value={totalApplications}
          subtitle="All recorded jobs"
          icon={Briefcase}
          color="emerald"
          onClick={() => navigate('/applications')}
        />
        <StatsCard
          title="Applied Today"
          value={appliedToday}
          trend="50% vs yesterday"
          trendType="up"
          icon={CalendarIcon}
          color="blue"
          onClick={() => navigate('/daily-tracker')}
        />
        <StatsCard
          title="Interviews"
          value={interviews}
          trend="0% vs last 7 days"
          trendType="neutral"
          icon={Clock}
          color="purple"
          onClick={() => navigate('/interviews')}
        />
        <StatsCard
          title="Pending"
          value={pending}
          trend="8% vs last 7 days"
          trendType="down"
          icon={CheckCircle2}
          color="amber"
          onClick={() => navigate('/applications?status=Applied')}
        />
        <StatsCard
          title="Offers"
          value={offers}
          trend="100% vs last 7 days"
          trendType="up"
          icon={Award}
          color="emerald"
          onClick={() => navigate('/applications?status=Offer')}
        />
        <StatsCard
          title="Rejected"
          value={rejected}
          trend="5% vs last 7 days"
          trendType="down"
          icon={XCircle}
          color="rose"
          onClick={() => navigate('/applications?status=Rejected')}
        />
      </div>

      {/* Middle Grid: Upcoming Interviews & Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upcoming Interviews (40%) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-emerald-700" />
              Upcoming Interviews
            </h3>
            <button
              onClick={() => navigate('/interviews')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {upcomingInterviews.length > 0 ? (
            <div className="space-y-3">
              {upcomingInterviews.slice(0, 3).map((app) => (
                <div
                  key={app._id}
                  onClick={() => navigate(`/applications/${app._id}`)}
                  className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 hover:border-emerald-300 transition-all cursor-pointer"
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
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 mt-2 font-bold">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
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
            /* 3D Calendar Graphic Empty State matching screenshot */
            <div className="py-8 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-100 via-emerald-50 to-teal-100 border border-emerald-200/80 flex flex-col items-center justify-center shadow-inner relative">
                <CalendarIcon className="w-10 h-10 text-emerald-700" />
                <Clock className="w-5 h-5 text-teal-700 absolute bottom-2 right-2 bg-white rounded-full p-0.5 border border-emerald-200" />
              </div>

              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">No upcoming Interviews</h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">You're all caught up!</p>
              </div>

              <button
                onClick={() => navigate('/applications')}
                className="px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Browse Applications
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Application Status Overview Donut & Legend Table (60%) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
              Application Status Overview
            </h3>

            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="This Month">This Month</option>
              <option value="All Time">All Time</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Donut Chart with Centered Total Count (5 cols) */}
            <div className="sm:col-span-5 relative h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Centered Total Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-900 leading-none">
                  {totalApplications}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                  Total
                </span>
              </div>
            </div>

            {/* Status Legend Table with Percentages (7 cols) */}
            <div className="sm:col-span-7 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
              {statusPieData.map((item) => (
                <div
                  key={item.name}
                  onClick={() => navigate(`/applications?status=${encodeURIComponent(item.name)}`)}
                  className="flex items-center justify-between p-1.5 px-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-semibold text-slate-700 truncate">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-extrabold text-slate-900">{item.value}</span>
                    <span className="text-[10px] text-slate-400 font-bold w-9 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications Section - Table View Matching Reference Screenshot */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Recent Applications
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Latest jobs you added to your tracker
            </p>
          </div>

          <button
            onClick={() => navigate('/applications')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Table View */}
        {recentApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Job Title</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Applied On</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {recentApplications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-emerald-50/40 transition-colors group cursor-pointer"
                    onClick={() => navigate(`/applications/${app._id}`)}
                  >
                    {/* Job Title & Tech Stack */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                        {app.jobRole}
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {app.workType} • {app.location || 'Remote'}
                      </p>
                    </td>

                    {/* Company Name & Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        {app.companyLogo ? (
                          <img
                            src={app.companyLogo}
                            alt={app.companyName}
                            className="w-7 h-7 rounded-lg object-contain bg-slate-50 border border-slate-200 p-0.5"
                          />
                        ) : (
                          <div
                            className={`w-7 h-7 rounded-lg ${getAvatarBg(
                              app.companyName
                            )} text-white font-bold text-xs flex items-center justify-center`}
                          >
                            {app.companyName ? app.companyName[0] : 'J'}
                          </div>
                        )}
                        <span className="font-bold text-slate-800">{app.companyName}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={app.status} size="small" />
                    </td>

                    {/* Applied Date */}
                    <td className="py-3.5 px-4 text-slate-500 font-semibold">
                      {app.appliedDate
                        ? new Date(app.appliedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'N/A'}
                    </td>

                    {/* Actions Menu */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(app._id, app.companyName, app.jobRole)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Application"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center border border-dashed border-slate-200 rounded-2xl space-y-2">
            <p className="font-bold text-slate-700 text-sm">No recent job applications</p>
            <button
              onClick={() => navigate('/add-application')}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              + Add Application
            </button>
          </div>
        )}
      </div>

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default Dashboard;



