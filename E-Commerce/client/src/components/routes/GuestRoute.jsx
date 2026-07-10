import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuestRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (user && Object.keys(user).length > 0) {
    // If logged in, redirect away from guest-only pages (like login/register)
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
