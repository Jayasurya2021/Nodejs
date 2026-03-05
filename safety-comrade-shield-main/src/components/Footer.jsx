import { Shield } from "lucide-react";

const Footer = () => (
    <footer
        className="border-top py-4"
        style={{ backgroundColor: "rgba(235,243,238,0.5)" }}
    >
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
            <div className="d-flex align-items-center gap-2">
                <Shield size={20} style={{ color: "var(--color-primary)" }} />
                <span className="font-display fw-bold fs-5" style={{ color: "var(--color-fg)" }}>
                    GramRaksha
                </span>
            </div>
            <p className="small text-muted-custom mb-0">
                © 2026 GramRaksha. Protecting villages, empowering communities.
            </p>
        </div>
    </footer>
);

export default Footer;
