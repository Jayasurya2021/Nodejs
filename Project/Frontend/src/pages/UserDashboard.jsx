import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api/api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const StatusBadge = ({ status }) => {
    const styles = {
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
        resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
    const normalizedStatus = status ? status.toLowerCase() : "";
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[normalizedStatus] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
            {status || "Unknown"}
        </span>
    );
};

const CategoryIcon = ({ category }) => {
    const icons = {
        road: "🚧",
        water: "💧",
        electricity: "⚡",
        garage: "🗑️",
        garbage: "🗑️",
        internet: "📡",
        streetlight: "💡"
    };
    const normalizedCategory = category ? category.toLowerCase() : "";
    return <span className="text-xl">{icons[normalizedCategory] || "📢"}</span>;
};

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyProblems = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await api.get("/api/user/myproblems", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (Array.isArray(res.data)) {
                    setComplaints(res.data);
                } else {
                    setComplaints([]);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching my problems:", err);
                setError("Failed to load your reports.");
                setLoading(false);
            }
        };

        if (!user) {
            navigate("/login");
            return;
        }

        if (user.role !== "user") {
            navigate("/");
            return;
        }

        fetchMyProblems();
    }, [user, navigate]);

    // Calculate Stats
    const totalIssues = complaints.length;
    const resolvedIssues = complaints.filter(c => c.status === 'resolved').length;
    const pendingIssues = complaints.filter(c => c.status !== 'resolved').length;

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 pt-24 pb-12 flex items-center justify-center">
                <Navbar />
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                    <p className="text-slate-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
            <Navbar />

            <main className="container mx-auto px-4 max-w-7xl py-24 pb-12">

                {/* Header & Stats */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div>
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">My Dashboard</span>
                            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Reported Issues</h1>
                            <p className="text-slate-500 mt-2 text-lg">
                                Manage and track the community problems you've reported.
                            </p>
                        </div>
                        <Link
                            to="/report-problem"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 hover:-translate-y-1 active:scale-95"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Report New Issue
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    {!loading && (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
                                    📝
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Reports</p>
                                    <p className="text-2xl font-black text-slate-900">{totalIssues}</p>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold">
                                    🎉
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Resolved</p>
                                    <p className="text-2xl font-black text-slate-900">{resolvedIssues}</p>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">
                                    ⏳
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending</p>
                                    <p className="text-2xl font-black text-slate-900">{pendingIssues}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="h-[320px] bg-white rounded-3xl border border-slate-200"></div>
                        ))}
                    </div>
                ) : (!Array.isArray(complaints) || complaints.length === 0) ? (
                    <div className="text-center py-24 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                        <div className="mx-auto h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-4xl shadow-sm">
                            ✨
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">No reports found</h3>
                        <p className="text-slate-500 mt-2 text-lg">You haven't reported any issues yet. Be the first!</p>
                        <Link
                            to="/report-problem"
                            className="mt-8 inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
                        >
                            Report Now
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {complaints.map((c) => (
                            <div
                                key={c._id}
                                className="group relative flex flex-col bg-white rounded-3xl shadow-sm border border-slate-200/60 transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 cursor-pointer overflow-hidden"
                                onClick={() => navigate(`/complaint/${c._id}`)}
                            >
                                {/* Image Logic */}
                                <div className="h-56 w-full bg-slate-100 relative overflow-hidden">
                                    {(c.status === 'resolved' && c.resolvedImage) || c.image ? (
                                        <img
                                            src={`http://localhost:5000/${(c.status === 'resolved' && c.resolvedImage) ? c.resolvedImage : c.image}`}
                                            alt={c.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                                            <svg className="w-12 h-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                                    {/* Floating Badges */}
                                    <div className="absolute top-4 right-4">
                                        {c.status === 'resolved' ? (
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-emerald-600 text-xs font-bold rounded-full shadow-lg border border-emerald-100 flex items-center gap-1">
                                                ✓ Resolved
                                            </span>
                                        ) : (
                                            <span className={`px-3 py-1 backdrop-blur-md text-xs font-bold rounded-full shadow-lg border flex items-center gap-1 ${c.status === 'in-progress' ? 'bg-blue-500/90 text-white border-blue-400' : 'bg-amber-400/90 text-white border-amber-300'}`}>
                                                {c.status === 'in-progress' ? '⏳ In Progress' : '• Pending'}
                                            </span>
                                        )}
                                    </div>

                                    <div className="absolute top-4 left-4">
                                        <span className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg text-lg">
                                            <CategoryIcon category={c.category} />
                                        </span>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <p className="text-xs font-medium opacity-90 flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {c.location ? c.location.split(',')[0] : 'Location'}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <h2 className="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {c.title}
                                    </h2>
                                    <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                                        {c.description}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                                        <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                                        <span className="text-blue-600 group-hover:underline">View Details →</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default UserDashboard;
