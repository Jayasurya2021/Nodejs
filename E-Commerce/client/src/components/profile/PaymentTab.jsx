import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CreditCard, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { updatePaymentMethods } from '../../redux/slices/authSlice';
import PaymentForm from '../PaymentForm';

const PaymentTab = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingPaymentData, setEditingPaymentData] = useState(null);

  const paymentMethods = user?.paymentMethods || [];

  const handleAddSubmit = async (formData) => {
    try {
      if (editingPaymentData?._id) {
        const { data } = await axios.put(`/api/users/payment-methods/${editingPaymentData._id}`, formData, { withCredentials: true });
        dispatch(updatePaymentMethods(data.paymentMethods));
        toast.success('Payment method updated successfully!');
      } else {
        const { data } = await axios.post('/api/users/payment-methods', formData, { withCredentials: true });
        dispatch(updatePaymentMethods(data.paymentMethods));
        toast.success('Payment method saved successfully!');
      }
      setIsAddingNew(false);
      setEditingPaymentData(null);
    } catch (error) {
      console.error(error);
      toast.error('Could not save payment method');
    }
  };

  const handleDelete = async (paymentId) => {
    try {
      const { data } = await axios.delete(`/api/users/payment-methods/${paymentId}`, { withCredentials: true });
      dispatch(updatePaymentMethods(data.paymentMethods));
      toast.success('Payment method deleted');
    } catch (error) {
      toast.error('Could not delete payment method');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold tracking-wide">Payment Methods</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your saved cards and UPI options</p>
        </div>
        {!isAddingNew && (
          <button 
            onClick={() => setIsAddingNew(true)}
            className="bg-black text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2 rounded-md shadow-sm"
          >
            <Plus size={16} /> Add New Method
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isAddingNew ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
          >
            <PaymentForm 
              initialData={editingPaymentData}
              onSubmit={handleAddSubmit} 
              onCancel={() => {
                setIsAddingNew(false);
                setEditingPaymentData(null);
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {paymentMethods.length === 0 ? (
              <div className="col-span-1 lg:col-span-2 text-center py-24 bg-white border border-gray-100 rounded-xl shadow-sm">
                <CreditCard size={48} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-xl font-bold mb-2 tracking-wide">No Payment Methods</h2>
                <p className="text-gray-500">You haven't saved any payment methods yet.</p>
              </div>
            ) : (
              paymentMethods.map((method) => (
                <div key={method._id} className="bg-white border border-gray-100 rounded-xl p-6 relative group hover:border-black transition-colors shadow-sm">
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setEditingPaymentData(method);
                        setIsAddingNew(true);
                      }}
                      className="p-2 bg-gray-50 text-gray-600 hover:text-black hover:bg-gray-200 rounded-full transition-colors"
                      title="Edit Method"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(method._id)}
                      className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-full transition-colors" 
                      title="Delete Method"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold uppercase tracking-wider">
                        {method.type}
                      </div>
                      {method.isDefault && (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <CheckCircle2 size={12} /> Default
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {method.type !== 'upi' ? (
                      <>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Card Number</p>
                          <p className="font-mono text-lg font-medium tracking-[0.2em]">**** **** **** {method.last4}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Name on Card</p>
                            <p className="text-sm font-semibold uppercase">{method.name}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Expires</p>
                            <p className="text-sm font-semibold">{method.expiry}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">UPI ID</p>
                          <p className="font-mono text-lg font-medium tracking-wider">{method.last4}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Name associated</p>
                            <p className="text-sm font-semibold uppercase">{method.name}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
            
            <div 
              onClick={() => setIsAddingNew(true)}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center text-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer border-dashed"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                <Plus size={24} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Add New Payment Method</h3>
                <p className="text-xs text-gray-500 mt-1">Cards, Google Pay, PhonePe</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentTab;
