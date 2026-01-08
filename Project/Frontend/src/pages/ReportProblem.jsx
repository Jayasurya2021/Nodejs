import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../Api/api";
const ReportProblem = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [gettingLocation, setGettingLocation] = useState(false);
    const [error, setError] = useState("");

    const categoriesList = [
        { id: "water", title: "Water Supply Department", sub: "Water leak, pipe, tap drop", icon: "🚰", color: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100" },
        { id: "road", title: "Public Works Department", sub: "Damaged road, traffic cone", icon: "🚧", color: "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100" },
        { id: "electricity", title: "Electricity Board", sub: "Electric pole, cable spark", icon: "⚡", color: "bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100" },
        { id: "garbage", title: "Municipal Sanitation", sub: "Garbage bin, waste collection", icon: "🗑️", color: "bg-green-50 text-green-600 border-green-200 hover:bg-green-100" },
        { id: "internet", title: "BSNL / Broadband", sub: "Wifi tower, internet network", icon: "📡", color: "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100" },
        { id: "streetlight", title: "Municipal Electrical", sub: "Streetlight not working", icon: "💡", color: "bg-cyan-50 text-cyan-600 border-cyan-200 hover:bg-cyan-100" }
    ];

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        setGettingLocation(true);
        setError("");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Reverse geocoding using OpenStreetMap (Nominatim)
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();

                    if (data && data.display_name) {
                        setLocation(data.display_name);
                    } else {
                        setLocation(`${latitude}, ${longitude}`);
                    }
                } catch (err) {
                    console.error("Error fetching address:", err);
                    setLocation(`${latitude}, ${longitude}`);
                    setError("Could not fetch address details, used coordinates instead.");
                } finally {
                    setGettingLocation(false);
                }
            },
            (err) => {
                console.error("Geolocation error:", err);
                setError("Unable to retrieve your location. Please check permissions.");
                setGettingLocation(false);
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title || !description || !location || !category) {
            setError("All fields are required");
            return;
        }

        setIsLoading(true);

        try {
            const token = localStorage.getItem('token'); // or useContext/Auth hook

            if (!token) {
                setError("Please login to report issues");
                setIsLoading(false);
                navigate('/login');
                return;
            }

            const body = { title, description, category, location };

            // Pass token via config (assuming your api instance supports it)
            await api.post("/api/user/problems", body, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Problem reported successfully ✅");

            setTitle("");
            setDescription("");
            setCategory("");
            setLocation("");
            setIsLoading(false);

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Something went wrong");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="container mx-auto px-4 max-w-2xl py-24 pb-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Report a Problem</h1>
                    <p className="mt-2 text-slate-500">
                        Spot an issue? Fill out the form below to let us know.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Issue Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Large Pothole on Main St"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium placeholder-slate-400"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category */}
                                {/* Category Grid */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-4">Select Category</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {categoriesList.map((cat) => (
                                            <div
                                                key={cat.id}
                                                onClick={() => setCategory(cat.id)}
                                                className={`cursor-pointer relative flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${category === cat.id
                                                    ? `${cat.color} border-current ring-1 ring-offset-2 ring-current transform scale-[1.02]`
                                                    : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-md"
                                                    }`}
                                            >
                                                <div className={`flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center text-2xl ${category === cat.id ? 'bg-white/50' : 'bg-slate-50'}`}>
                                                    {cat.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className={`font-bold text-sm ${category === cat.id ? 'text-current' : 'text-slate-900'}`}>
                                                        {cat.title}
                                                    </h3>
                                                    <p className={`text-xs mt-1 ${category === cat.id ? 'text-current/80' : 'text-slate-500'}`}>
                                                        {cat.sub}
                                                    </p>
                                                </div>
                                                {category === cat.id && (
                                                    <div className="absolute top-4 right-4 text-current">
                                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Enter address or use current location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium placeholder-slate-400"
                                        />
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleGetLocation}
                                            disabled={gettingLocation}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
                                            title="Use my current location"
                                        >
                                            {gettingLocation ? (
                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18d-2 2-2-2 4 4 4-4m6-6h.01M6 6h.01M6 18h.01M18 18h.01M6 12h.01M18 12h.01" />{/* Target icon variant */}
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                                    <circle cx="12" cy="9" r="2.5" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                <textarea
                                    placeholder="Describe the issue in detail..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium placeholder-slate-400 h-32 resize-none"
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting Report...
                                    </>
                                ) : (
                                    <>
                                        Submit Report
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportProblem;
