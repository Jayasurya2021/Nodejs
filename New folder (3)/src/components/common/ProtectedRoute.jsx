import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-12 w-48 bg-primary-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
