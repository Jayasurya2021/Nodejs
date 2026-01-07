import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const complaintData = {
  id: "1",
  title: "Pothole on Main Street",
  description:
    "Large pothole causing traffic issues and vehicle damage. Needs immediate attention.",
  category: "Road",
  status: "In Progress",
  location: "123 Main Street, Downtown District",
  userName: "John Doe",
  date: "Oct 24, 2023",
  imageUrl:
    "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1000",
};

/* -------- COMPONENT -------- */
const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(complaintData.status);

  // Status color mapping
  const getStatusColor = (s) => {
    switch (s.toLowerCase()) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'in progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="container mx-auto max-w-6xl px-4 py-24 pb-12">

        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-6"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Image & Status */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 bg-white">
              <div className="relative aspect-video w-full overflow-hidden bg-slate-200">
                {complaintData.imageUrl ? (
                  <img
                    src={complaintData.imageUrl}
                    alt="Complaint Evidence"
                    className="h-full w-full object-cover transition-transform hover:scale-105 duration-700"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    No Image Provided
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-md border backdrop-blur-md ${getStatusColor(status)}`}>
                    {status}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    {complaintData.category}
                  </span>
                  <span className="text-slate-400 text-sm">•</span>
                  <span className="text-slate-500 text-sm font-medium">{complaintData.date}</span>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                  {complaintData.title}
                </h1>

                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {complaintData.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder (could be real map later) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Location</h3>
                <p className="text-slate-600 mt-1">{complaintData.location}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar / Admin Actions */}
          <div className="space-y-6">

            {/* Admin/User Actions Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Update Status</h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Status
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer font-medium text-slate-700"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Update this status as the issue progresses.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="font-bold text-sm text-slate-900 mb-3">Reported By</h4>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                    {complaintData.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{complaintData.userName}</p>
                    <p className="text-xs text-slate-500">Community Member</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Helper / Info Card */}
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20">
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4">
                If this issue poses an immediate danger, please contact local emergency services.
              </p>
              <button className="w-full py-2.5 bg-white text-blue-600 font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors">
                Contact Support
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default ComplaintDetail;
