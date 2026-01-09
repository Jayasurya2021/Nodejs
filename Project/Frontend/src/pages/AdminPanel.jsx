import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";

// Single mock complaint - expanded for admin
// const mockComplaint = {
//     id: "1",
//     title: "Pothole on Main Street",
//     description:
//         "Large pothole near the intersection causing traffic issues. Several residents have complained about tire damage.",
//     category: "Road",
//     status: "Pending",
//     location: "123 Main Street",
//     imageUrl:
//         "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1000",
//     userName: "John Doe",
//     userEmail: "john@example.com",
//     createdAt: new Date().toLocaleDateString(),
//     priority: "High"
// };

const AdminPanel = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate(); // Hook must be inside component

    const fetchProblems = async () => {
        try {
            // Fetch admin-specific problems (filtered by department on backend)
            const res = await api.get("/api/admin/problems");
            if (Array.isArray(res.data)) {
                setProblems(res.data);
            } else {
                console.error("AdminPanel: API response is not an array:", res.data);
                setProblems([]);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Admin specific login page is redundant if unified
            return;
        }
        fetchProblems();
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleStatusUpdate = async (id, newStatus, remarks, file) => {
        try {
            const formData = new FormData();
            formData.append('status', newStatus);
            if (remarks) formData.append('remarks', remarks);
            if (file) formData.append('image', file);

            await api.patch(
                `/api/admin/problems/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        // Content-Type handled automatically
                    }
                }
            );

            // Refetch or update local state
            fetchProblems();
            alert("Updated successfully");
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 pb-20">
            {/* Navbar / Header */}
            <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-500">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Admin Portal</h1>
                            <p className="text-xs text-slate-500 font-medium">Welcome, {user?.name || "Administrator"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="text-slate-500 hover:text-blue-600 font-semibold text-sm transition-colors"
                        >
                            Home
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm hover:shadow-md active:scale-95 text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-7xl pt-32">

                {/* Dashboard Stats / Overview Header (Optional enhancement for future) */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Reported Issues</h2>
                        <p className="text-slate-500 mt-2 text-lg">Manage and resolve community problems effectively.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 shadow-sm">
                            Total: {problems.length}
                        </span>
                        <button className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all text-sm">
                            Refresh List
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-6 animate-pulse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-48 bg-white rounded-3xl border border-slate-200"></div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
                        {/* Table Header - Desktop */}
                        <div className="hidden md:grid grid-cols-12 gap-6 p-6 bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <div className="col-span-4">Problem Details</div>
                            <div className="col-span-2">Department</div>
                            <div className="col-span-3">Status & Location</div>
                            <div className="col-span-3">Resolution Actions</div>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {(!Array.isArray(problems) || problems.length === 0) ? (
                                <div className="p-16 text-center text-slate-400">
                                    <div className="text-6xl mb-4">📭</div>
                                    <p className="text-lg font-medium text-slate-600">No problems found</p>
                                    <p className="text-sm mt-2">Good news! There are no reported issues in your department.</p>
                                </div>
                            ) : problems.map((problem) => (
                                <ProblemRow
                                    key={problem._id}
                                    problem={problem}
                                    onUpdate={handleStatusUpdate}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const ProblemRow = ({ problem, onUpdate }) => {
    const [status, setStatus] = useState(problem.status);
    const [remarks, setRemarks] = useState("");
    const [file, setFile] = useState(null);

    const isResolved = status === 'resolved';

    return (
        <div className="group md:grid grid-cols-12 gap-6 p-6 bg-white hover:bg-slate-50/50 transition-colors duration-300">
            {/* Problem Info */}
            <div className="col-span-4 flex gap-5">
                <div className="relative h-24 w-24 shrink-0 rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-100 group-hover:shadow-lg transition-all">
                    {problem.image ? (
                        <img
                            src={`http://localhost:5000/${problem.image}`}
                            alt="Problem"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
                            onClick={() => window.open(`http://localhost:5000/${problem.image}`, '_blank')}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-300 text-3xl">📷</div>
                    )}
                </div>
                <div className="flex flex-col justify-center">
                    <h3
                        className="font-bold text-slate-900 text-lg leading-tight mb-1 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => window.open(`/complaint/${problem._id}`, '_blank')}
                    >
                        {problem.title} ↗
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{problem.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-400 font-medium">
                        <span>{new Date(problem.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{problem.reportedBy?.name || 'User'}</span>
                    </div>
                </div>
            </div>

            {/* Category */}
            <div className="col-span-2 hidden md:flex items-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {problem.category}
                </span>
            </div>

            {/* Status & Location */}
            <div className="col-span-3 hidden md:flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate max-w-[200px]">{problem.location}</span>
                </div>

                {problem.adminRemarks && (
                    <div className="bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-xs text-blue-800 leading-relaxed">
                        <span className="font-bold text-blue-600 block mb-0.5">Note:</span>
                        {problem.adminRemarks}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="col-span-3 flex flex-col gap-3">
                <div className="relative">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`w-full appearance-none pl-4 pr-10 py-2.5 text-sm font-bold rounded-xl border transition-all cursor-pointer focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
                          ${status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : ''}
                          ${status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' : ''}
                          ${status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : ''}
                        `}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                    <div className={`absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none opacity-60
                        ${status === 'pending' ? 'text-amber-700' : ''}
                        ${status === 'in-progress' ? 'text-blue-700' : ''}
                        ${status === 'resolved' ? 'text-emerald-700' : ''}
                    `}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Add remark..."
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 transition-colors"
                    />

                    {isResolved && (
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed transition-colors
                            ${(file || problem.resolvedImage) ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-300'}
                        `}>
                            {problem.resolvedImage && !file ? (
                                <div className="flex-1 flex items-center justify-between text-xs text-green-700 font-medium">
                                    <span className="flex items-center gap-1">✓ Evidence Saved</span>
                                    <button
                                        className="text-slate-400 hover:text-blue-600 underline"
                                        onClick={() => window.open(`http://localhost:5000/${problem.resolvedImage}`, '_blank')}
                                    >
                                        View
                                    </button>
                                </div>
                            ) : (
                                <input
                                    type="file"
                                    className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-200 file:text-slate-700 hover:file:bg-slate-300"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            )}
                        </div>
                    )}

                    {(status !== problem.status || remarks || file) && (
                        <button
                            className="w-full py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-2"
                            onClick={() => {
                                if (isResolved && !file && !problem.resolvedImage) {
                                    alert("Proof image is required to mark as Resolved.");
                                    return;
                                }
                                onUpdate(problem._id, status, remarks, file);
                                setRemarks("");
                                setFile(null);
                            }}
                        >
                            <span>Save Changes</span>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
