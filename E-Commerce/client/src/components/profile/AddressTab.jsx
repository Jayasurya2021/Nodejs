import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { updateAddresses } from '../../redux/slices/authSlice';
import AddressForm from '../AddressForm';

const AddressTab = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [editingAddressData, setEditingAddressData] = useState(null);

  const handleAddressFormSubmit = async (formData, shouldSave) => {
    try {
      if (editingAddressData?._id) {
        const { data } = await axios.put(`/api/users/addresses/${editingAddressData._id}`, formData, { withCredentials: true });
        dispatch(updateAddresses(data.addresses));
        toast.success('Address updated successfully!');
      } else {
        const { data } = await axios.post('/api/users/addresses', formData, { withCredentials: true });
        dispatch(updateAddresses(data.addresses));
        toast.success('Address saved successfully!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Could not save address');
      return;
    }
    
    setIsAddingNewAddress(false);
    setEditingAddressData(null);
  };

  const handleDelete = async (addressId) => {
    try {
      const { data } = await axios.delete(`/api/users/addresses/${addressId}`, { withCredentials: true });
      dispatch(updateAddresses(data.addresses));
      toast.success('Address deleted');
    } catch (error) {
      toast.error('Could not delete address');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold tracking-wide">Saved Addresses</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your delivery locations</p>
        </div>
        {!isAddingNewAddress && (
          <button 
            onClick={() => setIsAddingNewAddress(true)}
            className="bg-black text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2 rounded-md shadow-sm"
          >
            <Plus size={16} /> Add New Address
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isAddingNewAddress ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold mb-6">{editingAddressData ? 'Edit Address' : 'Add New Address'}</h3>
            <AddressForm 
              initialData={editingAddressData} 
              onSubmit={handleAddressFormSubmit} 
              onCancel={() => {
                setIsAddingNewAddress(false);
                setEditingAddressData(null);
              }}
              isCheckoutMode={false} 
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {(!user?.addresses || user.addresses.length === 0) ? (
              <div className="col-span-1 md:col-span-2 text-center py-24 bg-white border border-gray-100 rounded-xl shadow-sm">
                <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-xl font-bold mb-2 tracking-wide">No Addresses Found</h2>
                <p className="text-gray-500">You haven't saved any delivery addresses yet.</p>
              </div>
            ) : (
              user.addresses.map((address, i) => (
                <div key={address._id || i} className="bg-white border border-gray-100 rounded-xl p-6 relative group hover:border-black transition-colors shadow-sm flex flex-col h-full">
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setEditingAddressData(address);
                        setIsAddingNewAddress(true);
                      }}
                      className="p-2 bg-gray-50 text-gray-600 hover:text-black hover:bg-gray-200 rounded-full transition-colors"
                      title="Edit Address"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(address._id)}
                      className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                      title="Delete Address"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-bold text-sm uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-md inline-block">
                      {address.label || 'Home'}
                    </h3>
                    {i === 0 && (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <CheckCircle2 size={12} /> Default
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1 flex-grow">
                    <p className="font-semibold text-black">{user.name}</p>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.postalCode}</p>
                    <p>{address.country}</p>
                    <p className="pt-2 text-xs text-gray-500">Phone: {address.phone || 'Not provided'}</p>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressTab;
