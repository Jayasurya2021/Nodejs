import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-[9999]">
      <div className="flex flex-col items-center">
        {/* Modern clean animated spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300 animate-pulse">
          Loading amazing experiences...
        </p>
      </div>
    </div>
  );
};

export default Loading;
