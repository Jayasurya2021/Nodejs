import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, Menu, X, LogOut, LogIn, UserPlus, LayoutDashboard, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const navItems = [
    { label: "Home", path: "/", icon: null },
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Emergency", path: "/emergency", icon: AlertTriangle },
];

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        setMobileOpen(false);
        navigate("/login");
    };

    return (
        <header
            className="fixed-top"
            style={{
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid var(--color-border)",
                zIndex: 1030,
            }}
        >
            <div className="container-xl px-3 px-md-4">
                <div className="d-flex align-items-center justify-content-between" style={{ height: 68 }}>

                    {/* ── Brand ── */}
                    <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none" style={{ flexShrink: 0 }}>
                        <div
                            className="d-flex align-items-center justify-content-center rounded-3"
                            style={{
                                width: 38, height: 38,
                                background: "var(--gradient-hero)",
                                boxShadow: "0 4px 12px hsl(145 63% 32% / 0.35)",
                            }}
                        >
                            <Shield size={20} color="#fff" strokeWidth={2.2} />
                        </div>
                        <div className="d-flex flex-column" style={{ lineHeight: 1.1 }}>
                            <span className="font-display fw-bold" style={{ fontSize: "1.1rem", color: "var(--color-fg)", letterSpacing: "-0.02em" }}>
                                GramRaksha
                            </span>
                            <span className="d-none d-md-inline" style={{ fontSize: "0.65rem", color: "var(--color-muted-fg)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                                Village Safety Platform
                            </span>
                        </div>
                    </Link>

                    {/* ── Desktop nav ── */}
                    <nav className="d-none d-lg-flex align-items-center gap-1 mx-4" style={{ flex: 1, justifyContent: "center" }}>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-decoration-none small fw-semibold"
                                    style={{
                                        background: isActive ? "var(--color-primary)" : "transparent",
                                        color: isActive ? "#fff" : "var(--color-muted-fg)",
                                        transition: "all 0.18s ease",
                                        letterSpacing: "-0.01em",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = "rgba(45,122,79,0.08)";
                                            e.currentTarget.style.color = "var(--color-primary)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = "var(--color-muted-fg)";
                                        }
                                    }}
                                >
                                    {item.icon && <item.icon size={15} />}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* ── Desktop Auth ── */}
                    <div className="d-none d-lg-flex align-items-center gap-2" style={{ flexShrink: 0 }}>
                        {isAuthenticated ? (
                            <>
                                {/* User chip */}
                                <div
                                    className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                                    style={{ background: "rgba(45,122,79,0.08)", border: "1px solid rgba(45,122,79,0.18)" }}
                                >
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-circle"
                                        style={{ width: 26, height: 26, background: "var(--gradient-hero)", fontSize: "0.7rem", color: "#fff", fontWeight: 700 }}
                                    >
                                        {user?.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    <span className="small fw-semibold" style={{ color: "var(--color-primary)" }}>
                                        {user?.name?.split(" ")[0]}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-sm d-flex align-items-center gap-1 px-3"
                                    style={{
                                        border: "1.5px solid var(--color-destructive)",
                                        color: "var(--color-destructive)",
                                        background: "transparent",
                                        borderRadius: "0.5rem",
                                        fontWeight: 600,
                                        fontSize: "0.8rem",
                                    }}
                                >
                                    <LogOut size={14} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="btn btn-sm px-3 fw-semibold"
                                    style={{
                                        border: "1.5px solid var(--color-border)",
                                        color: "var(--color-fg)",
                                        background: "transparent",
                                        borderRadius: "0.5rem",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    <LogIn size={14} className="me-1" /> Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn btn-sm px-3 fw-semibold text-white d-flex align-items-center gap-1"
                                    style={{
                                        background: "var(--gradient-hero)",
                                        border: "none",
                                        borderRadius: "0.5rem",
                                        fontSize: "0.85rem",
                                        boxShadow: "0 4px 12px hsl(145 63% 32% / 0.3)",
                                    }}
                                >
                                    <UserPlus size={14} /> Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* ── Mobile hamburger ── */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="d-lg-none btn btn-sm rounded-3 d-flex align-items-center justify-content-center"
                        style={{ width: 38, height: 38, background: "rgba(45,122,79,0.08)", border: "1px solid var(--color-border)" }}
                        aria-label="Menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {mobileOpen
                                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} style={{ color: "var(--color-fg)" }} /></motion.span>
                                : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} style={{ color: "var(--color-fg)" }} /></motion.span>
                            }
                        </AnimatePresence>
                    </button>

                </div>
            </div>

            {/* ── Mobile drawer ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                        style={{ borderTop: "1px solid var(--color-border)", background: "rgba(255,255,255,0.97)" }}
                    >
                        <div className="container-xl px-3 py-3 d-flex flex-column gap-1">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setMobileOpen(false)}
                                        className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-decoration-none small fw-semibold"
                                        style={{
                                            background: isActive ? "var(--color-primary)" : "transparent",
                                            color: isActive ? "#fff" : "var(--color-muted-fg)",
                                        }}
                                    >
                                        {item.icon && <item.icon size={15} />}
                                        {item.label}
                                    </Link>
                                );
                            })}

                            {/* Mobile auth row */}
                            <div className="d-flex gap-2 mt-2 pt-2" style={{ borderTop: "1px solid var(--color-border)" }}>
                                {isAuthenticated ? (
                                    <>
                                        <div
                                            className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill me-auto"
                                            style={{ background: "rgba(45,122,79,0.08)", fontSize: "0.85rem" }}
                                        >
                                            <div
                                                className="d-flex align-items-center justify-content-center rounded-circle"
                                                style={{ width: 24, height: 24, background: "var(--gradient-hero)", fontSize: "0.65rem", color: "#fff", fontWeight: 700 }}
                                            >
                                                {user?.name?.charAt(0)?.toUpperCase()}
                                            </div>
                                            <span className="fw-semibold" style={{ color: "var(--color-primary)" }}>
                                                {user?.name?.split(" ")[0]}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-sm d-flex align-items-center gap-1 px-3"
                                            style={{ border: "1.5px solid var(--color-destructive)", color: "var(--color-destructive)", background: "transparent", borderRadius: "0.5rem", fontWeight: 600 }}
                                        >
                                            <LogOut size={14} /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" onClick={() => setMobileOpen(false)}
                                            className="btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-1 fw-semibold"
                                            style={{ border: "1.5px solid var(--color-border)", color: "var(--color-fg)", background: "transparent", borderRadius: "0.5rem" }}>
                                            <LogIn size={14} /> Login
                                        </Link>
                                        <Link to="/register" onClick={() => setMobileOpen(false)}
                                            className="btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-1 fw-semibold text-white"
                                            style={{ background: "var(--gradient-hero)", border: "none", borderRadius: "0.5rem", boxShadow: "0 4px 12px hsl(145 63% 32% / 0.3)" }}>
                                            <UserPlus size={14} /> Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
