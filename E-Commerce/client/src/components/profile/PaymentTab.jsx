import { CreditCard, Plus, Trash2, CheckCircle2 } from 'lucide-react';

const PaymentTab = () => {
  // Static mock data
  const paymentMethods = [
    { id: 1, type: 'visa', last4: '4242', expiry: '12/28', isDefault: true, name: 'Visa Classic' },
    { id: 2, type: 'mastercard', last4: '8888', expiry: '04/26', isDefault: false, name: 'Mastercard Gold' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold tracking-wide">Payment Methods</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your saved cards and UPI options</p>
        </div>
        <button 
          className="bg-black text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2 rounded-md shadow-sm"
        >
          <Plus size={16} /> Add New Card
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <div key={method.id} className="bg-white border border-gray-100 rounded-xl p-6 relative group hover:border-black transition-colors shadow-sm">
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-full transition-colors" title="Delete Card">
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
            </div>
          </div>
        ))}
        
        {/* UPI / Wallet Section Mock */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center text-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer border-dashed">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
            <Plus size={24} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Add UPI / Wallet</h3>
            <p className="text-xs text-gray-500 mt-1">Google Pay, PhonePe, Paytm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTab;
