import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        // You might want a loading spinner here
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!user) {
        // Not logged in, redirect to login with return url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Logged in but not authorized
        if (user.role === 'admin') {
            return <Navigate to="/admin" replace />;
        } else {
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
