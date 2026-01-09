import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../Api/api";
import { AuthContext } from "../context/AuthContext";

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit state
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await api.get(`/api/${id}`); // Uses the common route
        setComplaint(res.data);
        setStatus(res.data.status);
      } catch (err) {
        console.error("Failed to fetch complaint:", err);
        setError("Problem not found or access denied.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchComplaint();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('status', status);
      if (remarks) formData.append('remarks', remarks);
      if (file) formData.append('image', file);

      const res = await api.patch(`/api/admin/problems/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setComplaint(res.data);
      setStatus(res.data.status);
      setRemarks("");
      setFile(null);
      alert("Updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update");
    }
  };

  // Status color mapping
  const getStatusColor = (s) => {
    if (!s) return 'bg-slate-100 text-slate-700';
    switch (s.toLowerCase()) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) return <div className="min-h-screen pt-24 text-center">Loading...</div>;
  if (error || !complaint) return <div className="min-h-screen pt-24 text-center text-red-500">{error || "Not found"}</div>;

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      {!isAdmin && <Navbar />}

      <main className="container mx-auto max-w-7xl px-4 py-24 pb-20">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm hover:shadow-md mb-8"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Image & Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Image Card */}
            <div className="group relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 bg-slate-900 aspect-video">
              {complaint.image ? (
                <img
                  src={`http://localhost:5000/${complaint.image}`}
                  alt="Complaint Evidence"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  onClick={() => window.open(`http://localhost:5000/${complaint.image}`, '_blank')}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-500 bg-slate-100">
                  <span className="text-xl font-medium">No Image Provided</span>
                </div>
              )}

              {/* Floating Status Badge */}
              <div className="absolute top-6 right-6">
                <span className={`px-5 py-2 rounded-full text-sm font-bold shadow-lg border backdrop-blur-md uppercase tracking-wide ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
              </div>

              {/* Overlay Gradient Title */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent p-8 pt-20">
                <div className="flex items-center gap-3 mb-3 text-white/80 text-sm font-medium">
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 uppercase tracking-wider">{complaint.category}</span>
                  <span>•</span>
                  <span>{new Date(complaint.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight shadow-sm">
                  {complaint.title}
                </h1>
              </div>
            </div>

            {/* Description & Metadata */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
              <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
                {complaint.description}
              </p>

              <div className="mt-8 pt-8 border-t border-slate-100 grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Location</h4>
                    <p className="text-slate-500 mt-1 text-sm">{complaint.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-xl shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Reported By</h4>
                    <p className="text-slate-500 mt-1 text-sm">{complaint.reportedBy ? complaint.reportedBy.name : 'Anonymous User'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resolution & Timeline Section */}
            {(complaint.adminRemarks || complaint.resolvedImage) && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span>Resolution Updates</span>
                  {complaint.status === 'resolved' && (
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </h3>

                {complaint.adminRemarks && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Admin Remarks</h4>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 italic">
                      "{complaint.adminRemarks}"
                    </div>
                  </div>
                )}

                {complaint.updatedBy && (
                  <div className="mb-6 flex justify-end">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-500">
                      <svg className="w-3 h-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verified & Updated by {complaint.updatedBy.name}
                    </div>
                  </div>
                )}

                {complaint.resolvedImage && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Proof of Resolution</h4>
                    <div className="relative group rounded-2xl overflow-hidden border border-slate-200 cursor-zoom-in max-w-md"
                      onClick={() => window.open(`http://localhost:5000/${complaint.resolvedImage}`, '_blank')}
                    >
                      <img
                        src={`http://localhost:5000/${complaint.resolvedImage}`}
                        alt="Resolution"
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold shadow-lg transition-opacity">View Full Size</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar / Admin Actions */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">

            {isAdmin ? (
              // ADMIN EDIT CARD
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl shadow-blue-900/5 ring-1 ring-black/5">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">Update Status</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Current Status
                    </label>
                    <div className="relative">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer font-bold text-slate-700 shadow-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <svg className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Remark</label>
                    <textarea
                      className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all resize-none h-32"
                      placeholder="Add admin note or resolution details..."
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    ></textarea>
                  </div>

                  {status === 'resolved' && (
                    <div className={`p-4 rounded-xl border border-dashed transition-colors ${file || complaint.resolvedImage ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-300'}`}>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Proof Image</label>
                      {complaint.resolvedImage && <div className="text-xs font-bold text-green-600 mb-2 flex items-center gap-1">✓ Evidence already on file</div>}

                      <input
                        type="file"
                        className="w-full text-sm text-slate-500 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <p className="text-[10px] text-slate-400 mt-2">Required for resolving issues.</p>
                    </div>
                  )}

                  <button
                    onClick={handleUpdate}
                    className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-slate-800 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Save Changes</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* USER INFORMATION CARD */}
                <div className={`rounded-3xl p-8 border shadow-lg ${complaint.status === 'resolved' ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100 shadow-green-100' : 'bg-white border-slate-100'}`}>
                  <h3 className="font-bold text-xl text-slate-900 mb-2">Current Status</h3>
                  <p className="text-slate-600 mb-6">This issue is currently marked as <span className="font-bold">{complaint.status}</span>.</p>

                  {complaint.status === 'resolved' ? (
                    <div className="flex items-center gap-3 text-green-700 font-bold bg-white/60 p-4 rounded-xl border border-green-100/50">
                      <span className="p-2 bg-green-100 rounded-full">🎉</span>
                      <span>Issue Resolved</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-blue-700 font-bold bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <span className="p-2 bg-blue-100 rounded-full animate-pulse">⏳</span>
                      <span>In Progress</span>
                    </div>
                  )}
                </div>

                {/* Helper / Info Card */}
                <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                  <h3 className="font-bold text-xl mb-3 relative z-10">Need Assistance?</h3>
                  <p className="text-blue-100 text-sm mb-6 leading-relaxed relative z-10">
                    If this issue poses an immediate danger or hasn't been resolved in a timely manner, please contact support.
                  </p>
                  <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-sm relative z-10">
                    Contact Support
                  </button>
                </div>
              </>
            )}

          </div>
        </div>

      </main>
    </div>
  );
};

export default ComplaintDetail;
