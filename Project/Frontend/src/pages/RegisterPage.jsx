import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useApi from "../Api/useApi";
import api from "../Api/api";
import bgImage from "../assets/background-img/background-register.avif";

function Register({ department: propDepartment }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState(propDepartment || "");
    const [role, setRole] = useState(propDepartment ? "admin" : "user");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    const { request, loading, error: apiError } = useApi();
    const navigate = useNavigate();

    // form submission function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationErrors({});
        // checking the form data
        const emailFormet = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {};
        if (name.length < 2) newErrors.name = "Name must be at least 2 characters";

        if (!emailFormet.test(email)) newErrors.email = "Enter a valid email";
        if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters";
        if (password !== confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";
        if (role === "admin" && !department) newErrors.department = "Please select a department";

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }

        try {
            const endpoint = role === "admin" ? "api/admin/register" : "api/user/register";
            await request(() => api.post(endpoint, {
                name,
                email,
                password,
                department: role === "admin" ? department : undefined,
            }));

            // after form submission reset the form datas
            setName("");
            setEmail("");
            setPassword("");
            setDepartment("");
            setConfirmPassword("");
            alert("Account created successfully!");
            navigate("/login");


        } catch (err) {
            console.error("Registration failed", err);
            // api error is handled by the hook
        }
    };
    return (
        <div
            style={{ backgroundImage: `url(${bgImage})` }}
            className="flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed px-4 py-12 sm:px-6 lg:px-8 relative"
        >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[5px]"></div>
            <div className="w-full max-w-md space-y-8 animate-fade-in-up relative z-10">

                {/* Header */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
                        {propDepartment ? `Create your ${propDepartment.charAt(0).toUpperCase() + propDepartment.slice(1)} account` : "Create your account"}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Join MyCommunity and start making a difference
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white/50 backdrop-blur-lg py-8 px-4 shadow-xl shadow-slate-200/50 rounded-2xl sm:px-10 border border-white/50">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    disabled={loading}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                                    placeholder="John Doe"
                                />
                                {validationErrors.name && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                                )}
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    disabled={loading}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                                    placeholder="you@example.com"
                                />
                                {validationErrors.email && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                                )}
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    disabled={loading}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                                />
                                {validationErrors.password && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                                )}
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    disabled={loading}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                                />
                                {validationErrors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
                                )}
                            </div>
                        </div>

                        {/* Role Selection */}
                        {!propDepartment && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    I am a...
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="user"
                                            checked={role === "user"}
                                            onChange={(e) => {
                                                setRole(e.target.value);
                                                setDepartment(""); // Clear department when switching to user
                                            }}
                                            className="form-radio h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                        />
                                        <span className="text-slate-700">Public User</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="admin"
                                            checked={role === "admin"}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="form-radio h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                        />
                                        <span className="text-slate-700">Department Staff (Admin)</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Department Dropdown */}
                        {(role === "admin" || propDepartment) && (
                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-slate-700">
                                    Department
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="department"
                                        name="department"
                                        required
                                        disabled={loading || !!propDepartment}
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className={`appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors bg-white ${propDepartment ? 'bg-slate-100' : ''}`}
                                    >
                                        <option value="" disabled>Select your department</option>
                                        <option value="water">Water Supply Department</option>
                                        <option value="road">Public Works Department</option>
                                        <option value="electricity">Electricity Board</option>
                                        <option value="garbage">Municipal Sanitation</option>
                                        <option value="internet">BSNL / Broadband</option>
                                        <option value="streetlight">Municipal Electrical</option>
                                    </select>
                                    {validationErrors.department && (
                                        <p className="mt-1 text-sm text-red-600">{validationErrors.department}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* API Error Alert */}
                        {apiError && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        {/* Heroicon name: solid/x-circle */}
                                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            Registration failed
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            <p>{apiError}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-blue-500/30 hover:shadow-lg hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </div>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 text-slate-500">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign in here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
