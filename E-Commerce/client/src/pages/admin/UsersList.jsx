import { Users } from 'lucide-react';

const UsersList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mb-10 pb-6 border-b border-gray-200">
        <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
          <Users /> Manage Users
        </h1>
        <p className="text-gray-500 mt-2">View and manage all registered users.</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-500">
        <Users size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-bold mb-2">Users Management</h2>
        <p>Full user management table will be available here.</p>
      </div>
    </div>
  );
};

export default UsersList;
