import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Lock, LogIn, UserPlus, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

/**
 * ProtectedRoute — shows a beautiful access-denied page instead of
 * silently redirecting, so users understand WHY they can't proceed.
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div
                className="min-vh-100 d-flex align-items-center justify-content-center py-5"
                style={{ background: "var(--color-bg)" }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="text-center px-3"
                    style={{ maxWidth: 480 }}
                >
                    {/* Animated lock icon */}
                    <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                        style={{
                            width: 96,
                            height: 96,
                            background: "linear-gradient(135deg, hsl(145,63%,32%), hsl(160,50%,25%))",
                            boxShadow: "0 16px 40px -8px hsl(145 63% 32% / 0.4)",
                        }}
                    >
                        <Lock size={44} color="#fff" strokeWidth={1.8} />
                    </motion.div>

                    {/* Warning badge */}
                    <div className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-1 mb-3"
                        style={{ background: "rgba(220,53,69,0.1)", color: "var(--color-destructive)" }}>
                        <ShieldAlert size={14} />
                        <span className="small fw-semibold">Authentication Required</span>
                    </div>

                    <h1 className="font-display fw-bold mb-2" style={{ fontSize: "2rem", color: "var(--color-fg)" }}>
                        This page is protected
                    </h1>
                    <p className="text-muted-custom mb-4" style={{ lineHeight: 1.7 }}>
                        You need to be signed in to access this page. Please log in to your account or create a new one to continue.
                    </p>

                    {/* Action buttons */}
                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                        <Link
                            to="/login"
                            className="btn btn-primary-custom btn-lg px-4 d-flex align-items-center justify-content-center gap-2"
                            style={{ minWidth: 160 }}
                        >
                            <LogIn size={18} /> Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="btn btn-lg px-4 d-flex align-items-center justify-content-center gap-2"
                            style={{
                                border: "2px solid var(--color-primary)",
                                color: "var(--color-primary)",
                                background: "transparent",
                                minWidth: 160,
                            }}
                        >
                            <UserPlus size={18} /> Create Account
                        </Link>
                    </div>

                    {/* Decorative card below */}
                    <div
                        className="mt-5 rounded-custom p-3 d-flex align-items-center gap-3 text-start"
                        style={{
                            background: "var(--color-card)",
                            border: "1px solid var(--color-border)",
                            boxShadow: "var(--shadow-card)",
                        }}
                    >
                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{ width: 40, height: 40, background: "rgba(45,122,79,0.12)" }}
                        >
                            <ShieldAlert size={18} style={{ color: "var(--color-primary)" }} />
                        </div>
                        <p className="small text-muted-custom mb-0">
                            <strong style={{ color: "var(--color-fg)" }}>Why do I see this?</strong> Dashboard and Emergency pages require an account to ensure only verified community members can submit and view alerts.
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
