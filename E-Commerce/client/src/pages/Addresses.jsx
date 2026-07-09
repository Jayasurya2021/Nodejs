import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react';

const Addresses = () => {
  const { user } = useSelector((state) => state.auth);
  // Mock data for now as we don't have a backend endpoint for this yet, or it's within user profile.
  const [addresses, setAddresses] = useState(user?.addresses || []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex justify-between items-end mb-10 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
            <MapPin /> Saved Addresses
          </h1>
          <p className="text-gray-500 mt-2">Manage your delivery addresses for a faster checkout.</p>
        </div>
        <button className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2">
          <Plus size={18} /> Add New
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 border border-gray-100 rounded-lg">
          <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold mb-2">No Addresses Found</h2>
          <p className="text-gray-500">You haven't saved any addresses yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 relative group hover:border-black transition-colors">
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-gray-50 hover:bg-gray-200 rounded-full transition-colors"><Edit2 size={14} /></button>
                <button className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-full transition-colors"><Trash2 size={14} /></button>
              </div>
              <h3 className="font-bold text-lg mb-2">{address.fullName}</h3>
              <p className="text-gray-600 mb-1">{address.street}</p>
              <p className="text-gray-600 mb-1">{address.city}, {address.state} {address.zipCode}</p>
              <p className="text-gray-600">{address.country}</p>
              <p className="text-gray-500 mt-4 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black"></span> {address.phone}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
