import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Shield, Eye, EyeOff, LogIn } from "lucide-react";
import { motion } from "framer-motion";

// read backend URL from environment, fallback to localhost for development
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!data.success) {
                setError(data.message || "Login failed");
                return;
            }

            // Store token in localStorage via AuthContext
            login(data.token, data.user);
            navigate("/dashboard");
        } catch (err) {
            setError("Cannot connect to server. Make sure the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center py-5"
            style={{ background: "var(--color-bg)" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-100"
                style={{ maxWidth: 420 }}
            >
                {/* Card */}
                <div className="rounded-custom bg-card border border-custom shadow-elevated p-4 p-md-5 mx-3">
                    {/* Logo */}
                    <div className="text-center mb-4">
                        <div className="navbar-brand-icon mx-auto mb-3">
                            <Shield size={22} color="#fff" />
                        </div>
                        <h1 className="font-display fw-bold fs-3 mb-1" style={{ color: "var(--color-fg)" }}>
                            Welcome Back
                        </h1>
                        <p className="text-muted-custom small">Sign in to your GramRaksha account</p>
                    </div>

                    {/* Error alert */}
                    {error && (
                        <div className="alert alert-danger py-2 px-3 small mb-3" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label fw-medium small" style={{ color: "var(--color-fg)" }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                autoFocus
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <div className="d-flex justify-content-between mb-1">
                                <label className="form-label fw-medium small mb-0" style={{ color: "var(--color-fg)" }}>
                                    Password
                                </label>
                            </div>
                            <div className="input-group">
                                <input
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    className="form-control border-end-0"
                                    placeholder="Your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary border-start-0"
                                    onClick={() => setShowPass(!showPass)}
                                    tabIndex={-1}
                                >
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary-custom btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" />
                                    Signing in…
                                </>
                            ) : (
                                <>
                                    <LogIn size={18} /> Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <hr className="my-4" style={{ borderColor: "var(--color-border)" }} />
                    <p className="text-center small text-muted-custom mb-0">
                        New to GramRaksha?{" "}
                        <Link to="/register" style={{ color: "var(--color-primary)" }}>
                            Create account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
