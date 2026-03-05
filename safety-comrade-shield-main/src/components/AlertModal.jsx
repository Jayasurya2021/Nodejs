import { AlertTriangle, CheckCircle, Info } from "lucide-react";

const iconMap = {
    info: <Info size={24} style={{ color: "var(--color-primary)" }} />,
    warning: <AlertTriangle size={24} style={{ color: "var(--color-accent)" }} />,
    critical: <AlertTriangle size={24} style={{ color: "var(--color-destructive)" }} />,
};

const AlertModal = ({ open, onClose, title, description, level }) => {
    if (!open) return null;

    return (
        <>
            <div
                className="modal show d-block"
                tabIndex="-1"
                role="dialog"
                onClick={onClose}
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    style={{ maxWidth: "480px" }}
                    role="document"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-content rounded-custom bg-card border border-custom">
                        <div className="modal-header border-custom">
                            <div className="d-flex align-items-center gap-2">
                                {iconMap[level]}
                                <h5 className="modal-title font-display fw-bold mb-0" style={{ color: "var(--color-fg)" }}>
                                    {title}
                                </h5>
                            </div>
                            <button type="button" className="btn-close" onClick={onClose} />
                        </div>
                        <div className="modal-body text-muted-custom">{description}</div>
                        <div className="modal-footer border-custom">
                            <button
                                type="button"
                                className="btn btn-primary-custom"
                                onClick={onClose}
                            >
                                Acknowledge
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show" style={{ opacity: 0.5 }} />
        </>
    );
};

export default AlertModal;
