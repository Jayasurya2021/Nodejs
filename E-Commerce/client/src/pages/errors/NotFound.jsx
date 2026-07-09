import { Link } from 'react-router-dom';
import { AlertOctagon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <AlertOctagon size={64} className="text-gray-300 mb-6" />
      <h1 className="text-6xl font-black text-gray-900 tracking-tighter mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
