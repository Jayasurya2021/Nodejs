import { Link } from 'react-router-dom';
import { ServerCrash } from 'lucide-react';

const ServerError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <ServerCrash size={64} className="text-red-300 mb-6" />
      <h1 className="text-6xl font-black text-gray-900 tracking-tighter mb-4">500</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Internal Server Error</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Oops, something went wrong on our end. Please try again later.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default ServerError;
