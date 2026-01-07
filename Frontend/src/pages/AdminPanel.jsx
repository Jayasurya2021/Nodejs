import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// Single mock complaint - expanded for admin
const mockComplaint = {
    id: "1",
    title: "Pothole on Main Street",
    description:
        "Large pothole near the intersection causing traffic issues. Several residents have complained about tire damage.",
    category: "Road",
    status: "Pending",
    location: "123 Main Street",
    imageUrl:
        "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1000",
    userName: "John Doe",
    userEmail: "john@example.com",
    createdAt: new Date().toLocaleDateString(),
    priority: "High"
};

const AdminPanel = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="container mx-auto px-4 max-w-7xl pt-24 pb-12">

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Admin Console</h1>
                        <p className="text-slate-500 mt-1">Manage reported issues and update statuses.</p>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50">
                            Export Data
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
                            <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-md">1 New Report</span>
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

                            {/* Row Item */}
                            <div className="group md:grid grid-cols-12 gap-4 px-6 py-6 border-b border-slate-50 hover:bg-blue-50/30 transition-colors items-center">

                                {/* Mobile Image/Header */}
                                <div className="md:hidden mb-4">
                                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                                        <img src={mockComplaint.imageUrl} className="object-cover w-full h-full" alt="evidence" />
                                        <span className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded text-xs font-bold text-slate-900 shadow-sm">
                                            {mockComplaint.priority} Priority
                                        </span>
                                    </div>
                                </div>

                                <div className="col-span-4 flex gap-4">
                                    <img
                                        src={mockComplaint.imageUrl}
                                        className="h-16 w-16 rounded-lg object-cover hidden md:block shadow-sm"
                                        alt="thumbnail"
                                    />
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base">{mockComplaint.title}</h3>
                                        <p className="text-sm text-slate-500 line-clamp-1 mt-0.5">{mockComplaint.description}</p>
                                        <div className="flex items-center gap-2 mt-1.5 md:hidden">
                                            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">{mockComplaint.category}</span>
                                            <span className="text-xs text-slate-400">{mockComplaint.createdAt}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2 hidden md:block">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                        {mockComplaint.category}
                                    </span>
                                </div>

                                <div className="col-span-2 hidden md:block">
                                    <p className="text-sm text-slate-600 truncate">{mockComplaint.location}</p>
                                </div>

                                <div className="col-span-2 mt-4 md:mt-0">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                                        {mockComplaint.status}
                                    </span>
                                </div>

                                <div className="col-span-2 text-right mt-4 md:mt-0">
                                    <Link to={`/complaint/${mockComplaint.id}`} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                        View Details &rarr;
                                    </Link>
                                </div>
                            </div>
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
