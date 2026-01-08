import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api/api";
import { AuthContext } from "../context/AuthContext";

const StatusBadge = ({ status }) => {
    const styles = {
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
        resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
    const normalizedStatus = status ? status.toLowerCase() : "";
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[normalizedStatus] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
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
            navigate("/"); // Admins shouldn't be here ideally, or maybe they can? strict separation says no.
            return;
        }

        fetchMyProblems();
    }, [user, navigate]);

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                    <p className="text-slate-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <main className="container mx-auto px-4 max-w-7xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Issues</h1>
                        <p className="text-slate-500 mt-2 text-lg">
                            Track the status of problems you have reported.
                        </p>
                    </div>

                    <Link
                        to="/report-problem"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Report New Problem
                    </Link>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="h-48 bg-slate-200 rounded-2xl"></div>
                        ))}
                    </div>
                ) : (!Array.isArray(complaints) || complaints.length === 0) ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                        <div className="mx-auto h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-3xl">
                            📭
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">No reports found</h3>
                        <p className="text-slate-500 mt-2">You haven't reported any issues yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {complaints.map((c) => (
                            <div key={c._id} className="group relative flex flex-col bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                                        <CategoryIcon category={c.category} />
                                    </div>
                                    <StatusBadge status={c.status} />
                                </div>

                                <h2 className="text-lg font-bold text-slate-900 line-clamp-1 mb-2">
                                    {c.title}
                                </h2>
                                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                                    {c.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-medium">
                                    <span className="flex items-center gap-1">
                                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {c.location ? c.location.split(',')[0] : 'Unknown Location'}
                                    </span>
                                    <span>{new Date(c.createdAt).toLocaleDateString()}</span>
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
