import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const isAuthenticated = true; // Placeholder: Mocked to true to show Dashboard link
    const user = "Surya";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes (defer to avoid setting state synchronously in effect)
    useEffect(() => {
        const id = setTimeout(() => setMobileMenuOpen(false), 0);
        return () => clearTimeout(id);
    }, [location]);

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${isScrolled || mobileMenuOpen
                    ? "bg-white/80 backdrop-blur-md border-slate-200 shadow-sm"
                    : "bg-transparent border-transparent"
                }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-105">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <span className={`text-xl font-bold font-display tracking-tight transition-colors ${isScrolled || mobileMenuOpen ? 'text-slate-900' : 'text-slate-800'}`}>
                            CommunityFix
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                        <Link to="/#features" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                            Features
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-6">
                                <Link to="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                                    Dashboard
                                </Link>
                                <Link to="/report" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                                    Report Issue
                                </Link>
                                <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs font-bold text-slate-900">{user}</span>
                                        <span className="text-[10px] text-slate-500 font-medium">Resident</span>
                                    </div>
                                    <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm">
                                        {user.charAt(0)}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                                <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-slate-800 hover:-translate-y-0.5"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-2 px-4 py-6">
                    <Link
                        to="/"
                        className="block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    >
                        Home
                    </Link>
                    <Link
                        to="/#features"
                        className="block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    >
                        Features
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/report"
                                className="block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                            >
                                Report Issue
                            </Link>
                            <div className="mt-4 border-t border-slate-100 pt-4 px-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                                        {user.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">{user}</div>
                                        <div className="text-xs text-slate-500">Logged in</div>
                                    </div>
                                </div>
                                <button className="block w-full rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-bold text-red-600 hover:bg-red-100 transition-colors">
                                    Log out
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-6">
                            <Link
                                to="/login"
                                className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="block w-full rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
