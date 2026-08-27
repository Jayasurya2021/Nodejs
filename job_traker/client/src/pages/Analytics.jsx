import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { BarChart3, TrendingUp, Award, XCircle, Clock } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import { applicationAPI } from '../services/api';

const COLORS = [
  '#6366f1', // Indigo
  '#3b82f6', // Blue
  '#06b6d4', // Cyan
  '#a855f7', // Purple
  '#818cf8', // Technical
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#f43f5e', // Rose
];

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await applicationAPI.getStats();
        if (res.success) {
          setStats(res.stats);
        }
      } catch (err) {
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const {
    totalApplications = 0,
    interviewConversionRate = 0,
    offerRate = 0,
    rejectionRate = 0,
    statusCounts = {},
    dailyActivity = [],
  } = stats || {};

  const statusPieData = Object.entries(statusCounts)
    .filter(([_, count]) => count > 0)
    .map(([status, count]) => ({
      name: status,
      value: count,
    }));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
          <BarChart3 className="w-4 h-4" /> Application Performance Insights
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Analytics & Conversion Metrics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Visualize your job hunt efficiency, interview progression, and offer rates
        </p>
      </div>

      {/* Metric Rates Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Interview Rate"
          value={`${interviewConversionRate}%`}
          subtitle="Conversion to interview stage"
          icon={Clock}
          color="purple"
        />
        <StatsCard
          title="Offer Rate"
          value={`${offerRate}%`}
          subtitle="Conversion to offer"
          icon={Award}
          color="emerald"
        />
        <StatsCard
          title="Rejection Rate"
          value={`${rejectionRate}%`}
          subtitle="Non-selected applications"
          icon={XCircle}
          color="rose"
        />
        <StatsCard
          title="Total Applications"
          value={totalApplications}
          subtitle="Total recorded applications"
          icon={TrendingUp}
          color="indigo"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Timeline Chart */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
          <h3 className="font-extrabold text-slate-900 text-base mb-4">
            Daily Application Timeline (Last 14 Days)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyActivity}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="#e2e8f0" />
                <XAxis dataKey="label" stroke="#64748b" fontSize={11} fontWeight={600} />
                <YAxis stroke="#64748b" fontSize={11} fontWeight={600} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#cbd5e1',
                    borderRadius: '0.75rem',
                    color: '#0f172a',
                    fontSize: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontWeight: '600',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Applications"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Applications by Status Donut Chart */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
          <h3 className="font-extrabold text-slate-900 text-base mb-4">
            Applications by Pipeline Stage
          </h3>
          {statusPieData.length > 0 ? (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#cbd5e1',
                      borderRadius: '0.75rem',
                      color: '#0f172a',
                      fontSize: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      fontWeight: '600',
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px', fontWeight: '600' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-xs text-slate-400 font-medium">
              No status distribution data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

