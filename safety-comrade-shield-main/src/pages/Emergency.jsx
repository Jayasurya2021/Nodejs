import { useState } from "react";
import { useAlerts } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";
import { AlertTriangle, Send, CheckCircle, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Emergency = () => {
    const { addAlert } = useAlerts();
    const { isAuthenticated } = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [village, setVillage] = useState("");
    const [level, setLevel] = useState("warning");
    const [submitted, setSubmitted] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // If not logged in, show auth message instead of submitting
        if (!isAuthenticated) {
            setAuthError(true);
            return;
        }

        if (!title || !description || !village) return;

        addAlert({ title, description, village, level });
        setSubmitted(true);
        setAuthError(false);
        setModalOpen(true);
        setTimeout(() => {
            setTitle("");
            setDescription("");
            setVillage("");
            setLevel("warning");
            setSubmitted(false);
        }, 2000);
    };

    return (
        <div className="container py-5" style={{ maxWidth: 640 }}>
            {/* Icon + heading */}
            <div className="text-center mb-4">
                <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle pulse-glow"
                    style={{ width: 64, height: 64, backgroundColor: "rgba(220,53,69,0.1)" }}
                >
                    <AlertTriangle size={32} style={{ color: "var(--color-destructive)" }} />
                </div>
                <h1 className="font-display fw-bold mb-1" style={{ color: "var(--color-fg)" }}>
                    Emergency Report
                </h1>
                <p className="text-muted-custom">
                    Report a safety incident to alert authorities and nearby responders.
                </p>
            </div>

            {/* Auth error banner — shown on submit when not logged in */}
            <AnimatePresence>
                {authError && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="d-flex align-items-center gap-3 rounded-custom p-3 mb-4"
                        style={{
                            background: "rgba(220,53,69,0.07)",
                            border: "1.5px solid rgba(220,53,69,0.25)",
                        }}
                    >
                        <LogIn size={20} style={{ color: "var(--color-destructive)", flexShrink: 0 }} />
                        <p className="mb-0 small" style={{ color: "var(--color-destructive)" }}>
                            <strong>Please login or register</strong> to submit an emergency alert.{" "}
                            <Link to="/login" style={{ color: "var(--color-destructive)", textDecoration: "underline" }}>
                                Sign in
                            </Link>{" "}
                            or{" "}
                            <Link to="/register" style={{ color: "var(--color-destructive)", textDecoration: "underline" }}>
                                Create account
                            </Link>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="rounded-custom bg-card border border-custom p-4 shadow-card"
            >
                <div className="mb-3">
                    <label className="form-label fw-medium" style={{ color: "var(--color-fg)" }}>
                        Alert Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Flood in River Area"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); setAuthError(false); }}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-medium" style={{ color: "var(--color-fg)" }}>
                        Village Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Ramnagar"
                        value={village}
                        onChange={(e) => { setVillage(e.target.value); setAuthError(false); }}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-medium" style={{ color: "var(--color-fg)" }}>
                        Severity Level
                    </label>
                    <select
                        className="form-select"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-label fw-medium" style={{ color: "var(--color-fg)" }}>
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        placeholder="Describe the emergency situation in detail..."
                        value={description}
                        onChange={(e) => { setDescription(e.target.value); setAuthError(false); }}
                        rows={4}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary-custom btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
                    disabled={submitted}
                >
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.span key="done" initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="d-flex align-items-center gap-2">
                                <CheckCircle size={20} /> Alert Sent!
                            </motion.span>
                        ) : (
                            <motion.span key="send" className="d-flex align-items-center gap-2">
                                <Send size={20} /> Send Emergency Alert
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </form>

            {/* Success modal */}
            {modalOpen && (
                <>
                    <div className="modal show d-block" tabIndex="-1" role="dialog"
                        onClick={() => setModalOpen(false)}>
                        <div className="modal-dialog modal-dialog-centered" role="document"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="modal-content rounded-custom bg-card border border-custom">
                                <div className="modal-header border-custom">
                                    <h5 className="modal-title font-display fw-bold" style={{ color: "var(--color-fg)" }}>
                                        Alert Submitted
                                    </h5>
                                    <button type="button" className="btn-close" onClick={() => setModalOpen(false)} />
                                </div>
                                <div className="modal-body text-muted-custom">
                                    Your emergency alert has been recorded and authorities have been notified.
                                </div>
                                <div className="modal-footer border-custom">
                                    <button type="button" className="btn btn-primary-custom"
                                        onClick={() => setModalOpen(false)}>
                                        Acknowledge
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop show" style={{ opacity: 0.5 }} />
                </>
            )}
        </div>
    );
};

export default Emergency;
