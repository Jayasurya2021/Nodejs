import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="d-flex min-vh-100 align-items-center justify-content-center bg-muted">
            <div className="text-center">
                <h1 className="display-1 fw-bold mb-3">404</h1>
                <p className="fs-5 text-muted-custom mb-4">Oops! Page not found</p>
                <a href="/" className="text-decoration-underline" style={{ color: "var(--color-primary)" }}>
                    Return to Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;
