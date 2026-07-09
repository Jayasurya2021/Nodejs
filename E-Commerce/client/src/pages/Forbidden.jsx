import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <h1 className="text-9xl font-bold text-gray-900 dark:text-white">403</h1>
      <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mt-4 text-center">
        Access Forbidden
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-center max-w-md">
        You do not have the required permissions to access this page.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
};

export default Forbidden;
