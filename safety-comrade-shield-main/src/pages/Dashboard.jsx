import { useAlerts } from "@/context/AlertContext";
import { useAuth } from "@/context/AuthContext";
import { AlertTriangle, Info, Shield, Trash2, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const levelStyles = {
    info: { cls: "level-info", icon: Info },
    warning: { cls: "level-warning", icon: AlertTriangle },
    critical: { cls: "level-critical", icon: AlertTriangle },
};

const Dashboard = () => {
    const { alerts, clearAlerts } = useAlerts();
    const { isAuthenticated } = useAuth();

    const counts = {
        total: alerts.length,
        critical: alerts.filter((a) => a.level === "critical").length,
        warning: alerts.filter((a) => a.level === "warning").length,
        info: alerts.filter((a) => a.level === "info").length,
    };

    return (
        <div className="container py-5">
            {/* Header row */}
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                <div>
                    <h1 className="font-display fw-bold mb-1" style={{ color: "var(--color-fg)" }}>
                        Alert Dashboard
                    </h1>
                    <p className="text-muted-custom mb-0">Monitor village safety alerts in real time.</p>
                </div>
                {isAuthenticated && alerts.length > 0 && (
                    <button
                        onClick={clearAlerts}
                        className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
                    >
                        <Trash2 size={14} /> Clear All
                    </button>
                )}
            </div>

            {/* Auth notice — shown when not logged in */}
            {!isAuthenticated && (
                <div
                    className="d-flex align-items-center gap-3 rounded-custom p-3 mb-4"
                    style={{
                        background: "rgba(220,53,69,0.06)",
                        border: "1.5px solid rgba(220,53,69,0.22)",
                    }}
                >
                    <LogIn size={20} style={{ color: "var(--color-destructive)", flexShrink: 0 }} />
                    <p className="mb-0 small" style={{ color: "var(--color-destructive)" }}>
                        <strong>Please login or register</strong> to submit or manage alerts.{" "}
                        <Link to="/login" style={{ color: "var(--color-destructive)", textDecoration: "underline" }}>
                            Sign in
                        </Link>{" "}
                        or{" "}
                        <Link to="/register" style={{ color: "var(--color-destructive)", textDecoration: "underline" }}>
                            Create account
                        </Link>
                    </p>
                </div>
            )}

            {/* Stats */}
            <div className="row g-3 mb-5">
                {[
                    { label: "Total Alerts", value: counts.total, color: "var(--color-fg)" },
                    { label: "Critical", value: counts.critical, color: "var(--color-destructive)" },
                    { label: "Warnings", value: counts.warning, color: "var(--color-accent)" },
                    { label: "Info", value: counts.info, color: "var(--color-primary)" },
                ].map((s) => (
                    <div key={s.label} className="col-6 col-sm-3">
                        <div className="p-4 rounded-custom bg-card border border-custom shadow-card h-100">
                            <p className="small text-muted-custom mb-1">{s.label}</p>
                            <p className="font-display fw-bold mb-0" style={{ fontSize: "2rem", color: s.color }}>
                                {s.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Alert list */}
            {alerts.length === 0 ? (
                <div className="d-flex flex-column align-items-center py-5 text-center">
                    <Shield size={64} style={{ color: "rgba(45,122,79,0.22)" }} className="mb-3" />
                    <p className="fs-5 fw-medium text-muted-custom mb-1">No alerts yet</p>
                    <p className="small text-muted-custom">Report an emergency to see alerts here.</p>
                </div>
            ) : (
                <div className="d-flex flex-column gap-3">
                    {alerts.map((alert, i) => {
                        const style = levelStyles[alert.level];
                        const Icon = style.icon;
                        return (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="d-flex align-items-start gap-3 rounded-custom bg-card border border-custom p-4 shadow-card"
                            >
                                <div className={`alert-icon-wrap ${style.cls}`}>
                                    <Icon size={18} />
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-1">
                                        <h3 className="font-display fw-bold mb-0 fs-6" style={{ color: "var(--color-fg)" }}>
                                            {alert.title}
                                        </h3>
                                        <span className="small text-muted-custom">
                                            {alert.timestamp.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="small text-muted-custom mb-1">{alert.description}</p>
                                    <span className="badge rounded-pill text-muted-custom bg-muted px-2 py-1">
                                        {alert.village}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
