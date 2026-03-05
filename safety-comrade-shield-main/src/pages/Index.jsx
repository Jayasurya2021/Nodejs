import { Link } from "react-router-dom";
import { Shield, Bell, BarChart3, Phone } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-village.jpg";

const features = [
    {
        icon: Bell,
        title: "Real-time Alerts",
        desc: "Instant notifications for floods, fires, and safety threats across villages.",
    },
    {
        icon: BarChart3,
        title: "Live Dashboard",
        desc: "Monitor all village alerts on a centralized, real-time dashboard.",
    },
    {
        icon: Phone,
        title: "Emergency SOS",
        desc: "One-tap emergency button to alert authorities and nearby responders.",
    },
    {
        icon: Shield,
        title: "Community Safety",
        desc: "Empower gram panchayats with data-driven safety insights.",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.5 },
    }),
};

const Index = () => (
    <div>
        {/* Hero */}
        <section className="hero-section">
            <img
                src={heroImage}
                alt="Indian village landscape"
                className="hero-img"
                loading="lazy"
            />
            <div className="hero-overlay" />
            <div className="container hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{ maxWidth: "600px" }}
                >
                    <h1 className="font-display fw-bolder text-white mb-3" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
                        Protecting Every Village
                    </h1>
                    <p className="text-white mb-4 fs-5" style={{ opacity: 0.85 }}>
                        GramRaksha is a community-powered safety platform that brings real-time alerts, emergency response, and data-driven protection to rural India.
                    </p>
                    <div className="d-flex flex-wrap gap-3">
                        <Link to="/dashboard" className="btn btn-primary-custom btn-lg px-4 shadow-elevated">
                            View Dashboard
                        </Link>
                        <Link
                            to="/emergency"
                            className="btn btn-outline-light btn-lg px-4"
                        >
                            Emergency SOS
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* Features */}
        <section className="py-5">
            <div className="container py-4">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="font-display fw-bold text-center mb-3"
                    style={{ color: "var(--color-fg)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
                >
                    How GramRaksha Works
                </motion.h2>
                <p className="text-center text-muted-custom mb-5" style={{ maxWidth: "480px", margin: "0 auto 3rem" }}>
                    A comprehensive safety ecosystem designed for villages and rural communities.
                </p>
                <div className="row g-4">
                    {features.map((f, i) => (
                        <div key={f.title} className="col-sm-6 col-lg-3">
                            <motion.div
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="h-100 p-4 rounded-custom bg-card border border-custom shadow-card"
                                style={{ transition: "box-shadow 0.2s" }}
                            >
                                <div className="feature-icon mb-3">
                                    <f.icon size={24} />
                                </div>
                                <h3 className="font-display fw-bold mb-2 fs-5" style={{ color: "var(--color-fg)" }}>
                                    {f.title}
                                </h3>
                                <p className="text-muted-custom small mb-0">{f.desc}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-hero py-5">
            <div className="container py-4 text-center">
                <h2 className="font-display fw-bold text-white mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
                    Ready to Safeguard Your Village?
                </h2>
                <p className="text-white mb-4" style={{ opacity: 0.8, maxWidth: "480px", margin: "0 auto 1.5rem" }}>
                    Join thousands of gram panchayats using GramRaksha to keep their communities safe.
                </p>
                <Link to="/emergency" className="btn btn-accent btn-lg px-5">
                    Report an Emergency
                </Link>
            </div>
        </section>
    </div>
);

export default Index;
