import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BuyerRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Allow buyers (and admins as fallback if needed)
  if (user.role === 'buyer' || user.role === 'admin') {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default BuyerRoute;
