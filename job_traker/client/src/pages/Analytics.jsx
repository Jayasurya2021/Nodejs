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
  '#1f3144', // Slate Navy
  '#4a708b', // Steel Denim Blue
  '#8eb0c0', // Dusty Ice Blue
  '#35526c', // Midnight Slate
  '#2b4156', // Deep Steel
  '#d4a373', // Amber Gold
  '#10b981', // Emerald
  '#e11d48', // Crimson Rose
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
        <div className="w-8 h-8 border-4 border-[#1f3144] border-t-transparent rounded-full animate-spin" />
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
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4a708b] mb-1">
          <BarChart3 className="w-4 h-4" /> Application Performance Insights
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1f3144] tracking-tight">
          Analytics & Conversion Metrics
        </h1>
        <p className="text-xs sm:text-sm text-[#4a708b] font-medium mt-1">
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
        <div className="bg-white border border-[#d8cebd] rounded-3xl p-6 shadow-xs">
          <h3 className="font-extrabold text-[#1f3144] text-base mb-4">
            Daily Application Timeline (Last 14 Days)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyActivity}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1f3144" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1f3144" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="#d8cebd" />
                <XAxis dataKey="label" stroke="#4a708b" fontSize={11} fontWeight={600} />
                <YAxis stroke="#4a708b" fontSize={11} fontWeight={600} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#d8cebd',
                    borderRadius: '0.75rem',
                    color: '#1f3144',
                    fontSize: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontWeight: '600',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Applications"
                  stroke="#1f3144"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Applications by Status Donut Chart */}
        <div className="bg-white border border-[#d8cebd] rounded-3xl p-6 shadow-xs">
          <h3 className="font-extrabold text-[#1f3144] text-base mb-4">
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
                      borderColor: '#d8cebd',
                      borderRadius: '0.75rem',
                      color: '#1f3144',
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
            <div className="h-72 flex items-center justify-center text-xs text-[#4a708b] font-medium">
              No status distribution data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;


