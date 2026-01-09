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

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title || !description || !location || !category || !image) {
            setError("All fields are required, including an image");
            return;
        }

        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setError("Please login to report issues");
                setIsLoading(false);
                navigate('/login');
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('location', location);
            if (image) {
                formData.append('image', image);
            }

            await api.post("/api/user/problems", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            alert("Problem reported successfully ✅");

            setTitle("");
            setDescription("");
            setCategory("");
            setLocation("");
            setImage(null);
            setIsLoading(false);

            navigate("/DashBoard");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Something went wrong");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
            <Navbar />

            <div className="container mx-auto px-4 max-w-4xl py-24 pb-12">
                <div className="text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">Community Watch</span>
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Report an Issue</h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Help us maintain our community standards by reporting infrastructure or service problems.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                    {/* Decorative header line */}
                    <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>

                    <div className="p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Section 1: Basic Info */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Issue Title</label>
                                    <input
                                        type="text"
                                        placeholder="Briefly summarize the problem (e.g. Broken Streetlight)"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold text-slate-700 placeholder-slate-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-4">Category</label>
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
                                                <div className={`flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center text-xl shadow-sm ${category === cat.id ? 'bg-white/50' : 'bg-slate-50'}`}>
                                                    {cat.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className={`font-bold text-sm ${category === cat.id ? 'text-current' : 'text-slate-900'}`}>
                                                        {cat.title}
                                                    </h3>
                                                    <p className={`text-[10px] mt-0.5 font-medium ${category === cat.id ? 'text-current/70' : 'text-slate-400'}`}>
                                                        {cat.sub}
                                                    </p>
                                                </div>
                                                {category === cat.id && (
                                                    <div className="absolute top-3 right-3 text-current">
                                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Section 2: Details & Location */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Address or Landmark"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-700"
                                            />
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
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18d-2 2-2-2 4 4 4-4m6-6h.01M6 6h.01M6 18h.01M18 18h.01M6 12h.01M18 12h.01" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Evidence Photo</label>
                                        <div className={`border-2 border-dashed rounded-2xl p-6 transition-all text-center
                                            ${image ? 'border-green-300 bg-green-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'}`}
                                        >
                                            <input
                                                type="file"
                                                id="file-upload"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                                                {image ? (
                                                    <>
                                                        <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm font-bold text-green-700 truncate max-w-[200px]">{image.name}</span>
                                                        <span className="text-xs text-green-600 mt-1">Click to change</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
                                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm font-bold text-slate-600">Click to upload photo</span>
                                                        <span className="text-xs text-slate-400 mt-1">JPG, PNG allowed</span>
                                                    </>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                    <textarea
                                        placeholder="Please provide details about the issue..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium h-full min-h-[160px] resize-none text-slate-700 leading-relaxed"
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                                    <svg className="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <div>
                                        <h4 className="text-sm font-bold text-red-700">Submission Error</h4>
                                        <p className="text-xs text-red-600 mt-1">{error}</p>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-3"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Submitting Report...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Submit Report</span>
                                        <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
