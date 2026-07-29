import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { openLoginModal } from '../../redux/slices/uiSlice';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const dispatch = useDispatch();
  const { user, isLoading, isCheckingAuth } = useSelector((state) => state.auth);

  if (isLoading || isCheckingAuth) {
    // Render immediately with default values while checking auth (silent initialization)
    return <Outlet />;
  }

  // If not logged in, redirect to login
  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/login" replace />;
  }

  // If user is pending and trying to access a non-pending route, redirect to complete-profile
  if (user.role === 'pending' && !allowedRoles.includes('pending')) {
    return <Navigate to="/complete-profile" replace />;
  }

  // If roles are specified and user role is not included, redirect to forbidden
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
