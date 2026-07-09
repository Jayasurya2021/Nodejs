import { WifiOff } from 'lucide-react';

const NetworkError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <WifiOff size={64} className="text-gray-400 mb-6" />
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Network Error</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        We couldn't connect to the server. Please check your internet connection and try again.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
      >
        Retry
      </button>
    </div>
  );
};

export default NetworkError;
