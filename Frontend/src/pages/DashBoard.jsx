import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* -------- MOCK DATA -------- */

const mockComplaints = [
  {
    id: "1",
    title: "Dangerous Pothole",
    description: "Large pothole on Main Street causing traffic issues and potential vehicle damage.",
    category: "Road",
    status: "Pending",
    location: "123 Main Street, Downtown",
    date: "2 hrs ago",
    priority: "High"
  },
  {
    id: "2",
    title: "Water Leakage",
    description: "Continuous water leak from the fire hydrant near the park entrance.",
    category: "Water",
    status: "In Progress",
    location: "456 Oak Avenue, Westside",
    date: "1 day ago",
    priority: "Medium"
  },
  {
    id: "3",
    title: "Street Light Broken",
    description: "Street light flickering and turning off at night, causing safety concerns.",
    category: "Electricity",
    status: "Resolved",
    location: "789 Pine Lane, North Hills",
    date: "3 days ago",
    priority: "Low"
  },
  {
    id: "4",
    title: "Garbage Pileup",
    description: "Garbage has not been collected for two weeks in the residential area.",
    category: "Sanitation",
    status: "Pending",
    location: "Near Central Park",
    date: "5 hrs ago",
    priority: "High"
  },
];

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
    Resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
      {status}
    </span>
  );
};

const CategoryIcon = ({ category }) => {
  // Simple icon mapping or generic fallback
  const icons = {
    Road: "🚧",
    Water: "💧",
    Electricity: "⚡",
    Sanitation: "🗑️",
  };
  return <span className="text-xl">{icons[category] || "📢"}</span>;
};

/* -------- COMPONENT -------- */

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setComplaints(mockComplaints);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <main className="container mx-auto px-4 max-w-7xl">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Overview of your reported community issues.
            </p>
          </div>

          <Link
            to="/report"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Report New Problem
          </Link>
        </div>

        {/* Stats Overview (Optional enhancement) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Reports", value: complaints.length, color: "bg-white border-slate-200" },
            { label: "Pending", value: complaints.filter(c => c.status === "Pending").length, color: "bg-orange-50 border-orange-100" },
            { label: "Resolved", value: complaints.filter(c => c.status === "Resolved").length, color: "bg-emerald-50 border-emerald-100" }
          ].map((stat, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border shadow-sm ${stat.color}`}>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-slate-200 rounded-2xl"></div>
            ))}
          </div>
        ) : complaints.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="mx-auto h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-3xl">
              📭
            </div>
            <h3 className="text-xl font-semibold text-slate-900">No reports yet</h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto">
              You haven't reported any problems. Be the first to improve your community!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {complaints.map((c) => (
              <Link
                to={`/complaint/${c.id}`}
                key={c.id}
                className="group relative flex flex-col bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:border-blue-100 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm group-hover:bg-blue-50 transition-colors">
                    <CategoryIcon category={c.category} />
                  </div>
                  <StatusBadge status={c.status} />
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {c.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {c.location.split(',')[0]}
                  </span>
                  <span>{c.date}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
