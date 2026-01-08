import { useEffect, useState } from "react";
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
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await api.patch(
                `/api/admin/problems/${id}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                    // Note: ensure backend accepts this token. 
                    // Since we used same secret for admin token as user token, 
                    // and backend middleware just verifies signature, this works.
                    // Ideally we should differentiate in middleware or use user role check.
                }
            );

            // Refetch or update local state
            fetchProblems();
            alert("Status updated successfully");
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <main className="container mx-auto px-4 max-w-7xl pt-24 pb-12">

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Admin Console</h1>
                        <p className="text-slate-500 mt-1">Manage reported issues and update statuses.</p>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-600 font-medium hover:bg-red-100 transition-colors"
                        >
                            Logout
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                            + Load More
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="animate-pulse space-y-4">
                        <div className="h-12 bg-slate-200 rounded-xl w-full"></div>
                        <div className="h-64 bg-slate-200 rounded-xl w-full"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h2 className="font-bold text-slate-800">Recent Reports</h2>
                            <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-md">{problems.length} Reports</span>
                        </div>

                        <div className="p-0">
                            {/* Desktop Table Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                                <div className="col-span-4">Issue</div>
                                <div className="col-span-2">Category</div>
                                <div className="col-span-2">Location</div>
                                <div className="col-span-2">Status</div>
                                <div className="col-span-2 text-right">Actions</div>
                            </div>

                            {/* Problem Rows */}
                            {(!Array.isArray(problems) || problems.length === 0) ? (
                                <div className="p-8 text-center text-slate-500">No problems reported yet.</div>
                            ) : problems.map((problem) => (
                                <div key={problem._id} className="group md:grid grid-cols-12 gap-4 px-6 py-6 border-b border-slate-50 hover:bg-blue-50/30 transition-colors items-center">

                                    <div className="col-span-4 flex gap-4">
                                        {/* Thumbnail if available, else placeholder */}
                                        <div className="h-16 w-16 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                            <span className="text-2xl">📷</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-base">{problem.title}</h3>
                                            <p className="text-sm text-slate-500 line-clamp-1 mt-0.5">{problem.description}</p>
                                        </div>
                                    </div>

                                    <div className="col-span-2 hidden md:block">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                            {problem.category || 'General'}
                                        </span>
                                    </div>

                                    <div className="col-span-2 hidden md:block">
                                        <p className="text-sm text-slate-600 truncate">{problem.location}</p>
                                    </div>

                                    <div className="col-span-2 mt-4 md:mt-0">
                                        <select
                                            value={problem.status}
                                            onChange={(e) => handleStatusUpdate(problem._id, e.target.value)}
                                            className={`text-xs font-bold px-2 py-1 rounded-full border outline-none cursor-pointer
                                                ${problem.status === 'pending' ? 'bg-amber-100 text-amber-800 border-amber-200' : ''}
                                                ${problem.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                                                ${problem.status === 'resolved' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : ''}
                                            `}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                    </div>

                                    <div className="col-span-2 text-right mt-4 md:mt-0">
                                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                            View Details &rarr;
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
                            <button className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                                View All Reports (Archive)
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;
