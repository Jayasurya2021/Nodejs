import { useState, useEffect } from 'react';
import { FiX, FiCreditCard, FiSmartphone, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const PaymentForm = ({ initialData, onSubmit, onCancel }) => {
  const [paymentType, setPaymentType] = useState('card');
  const [isDefault, setIsDefault] = useState(false);

  // Card State
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // UPI State
  const [upiId, setUpiId] = useState('');
  const [upiName, setUpiName] = useState('');

  useEffect(() => {
    if (initialData) {
      setIsDefault(initialData.isDefault || false);
      if (initialData.type === 'upi') {
        setPaymentType('upi');
        setUpiId(initialData.last4 || '');
        setUpiName(initialData.name || '');
      } else {
        setPaymentType('card');
        setCardNumber(`**** **** **** ${initialData.last4 || ''}`);
        setExpiry(initialData.expiry || '');
        setCardName(initialData.name || '');
      }
    }
  }, [initialData]);

  const handleCardNumberChange = (e) => {
    // Format as 1111 1111 1111 1111
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    // Format as MM/YY
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setExpiry(value);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    setCvv(value);
  };

  const validateForm = () => {
    if (paymentType === 'card') {
      // If editing, we allow the mocked **** string. If adding, we check length.
      const rawCard = cardNumber.replace(/\D/g, '');
      if (!initialData && rawCard.length < 15) {
        toast.error('Please enter a valid card number');
        return false;
      }
      if (expiry.length < 5) {
        toast.error('Please enter a valid expiry date');
        return false;
      }
      if (!initialData && cvv.length < 3) {
        toast.error('Please enter a valid CVV');
        return false;
      }
      if (!cardName.trim()) {
        toast.error('Please enter the name on the card');
        return false;
      }
    } else {
      if (!upiId.trim() || !upiId.includes('@')) {
        toast.error('Please enter a valid UPI ID');
        return false;
      }
      if (!upiName.trim()) {
        toast.error('Please enter the name associated with the UPI ID');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let payload = {};

    if (paymentType === 'card') {
      const rawCard = cardNumber.replace(/\D/g, '');
      
      // If we are editing and user didn't change the card number, rawCard might just be the last4
      const last4 = rawCard.length === 4 ? rawCard : rawCard.slice(-4);
      
      // Determine card brand simple logic if it's new
      let brand = initialData?.type || 'card';
      if (!initialData || rawCard.length > 4) {
        if (rawCard.startsWith('4')) brand = 'visa';
        else if (rawCard.startsWith('5')) brand = 'mastercard';
        else if (rawCard.startsWith('3')) brand = 'amex';
      }

      payload = {
        type: brand,
        last4,
        expiry,
        name: cardName,
        isDefault
      };
    } else {
      payload = {
        type: 'upi',
        last4: upiId, // Store upiId in last4 field since we don't have a dedicated field
        name: upiName,
        isDefault
      };
    }

    onSubmit(payload);
  };

  return (
    <div className="bg-white rounded-[12px] shadow-2xl overflow-hidden flex flex-col w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          {initialData ? 'Edit Payment Method' : 'Add New Payment Method'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="p-6">
        {/* Payment Type Selector */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setPaymentType('card')}
            className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all ${
              paymentType === 'card' 
                ? 'border-black bg-gray-50 text-black shadow-sm' 
                : 'border-gray-100 text-gray-400 hover:border-gray-200 hover:bg-gray-50'
            }`}
          >
            <FiCreditCard size={24} />
            <span className="font-semibold text-sm">Credit / Debit Card</span>
          </button>
          
          <button
            onClick={() => setPaymentType('upi')}
            className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all ${
              paymentType === 'upi' 
                ? 'border-black bg-gray-50 text-black shadow-sm' 
                : 'border-gray-100 text-gray-400 hover:border-gray-200 hover:bg-gray-50'
            }`}
          >
            <FiSmartphone size={24} />
            <span className="font-semibold text-sm">UPI / Wallet</span>
          </button>
        </div>

        {/* Card Form */}
        {paymentType === 'card' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Card Number *</label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Expiry Date *</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={handleExpiryChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                  CVV {initialData ? '(Optional if editing)' : '*'}
                </label>
                <input
                  type="password"
                  placeholder="•••"
                  value={cvv}
                  onChange={handleCvvChange}
                  maxLength={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Name on Card *</label>
              <input
                type="text"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm uppercase focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              />
            </div>
          </div>
        )}

        {/* UPI Form */}
        {paymentType === 'upi' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">UPI ID *</label>
              <input
                type="text"
                placeholder="username@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value.toLowerCase())}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Name associated with UPI *</label>
              <input
                type="text"
                placeholder="John Doe"
                value={upiName}
                onChange={(e) => setUpiName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              />
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100">
          <label className="flex items-center gap-3 cursor-pointer group w-max">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-[4px] checked:bg-black checked:border-black transition-colors cursor-pointer"
              />
              {isDefault && <FiCheck className="absolute text-white pointer-events-none" size={14} strokeWidth={4} />}
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">
              Set as Default Payment Method
            </span>
          </label>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/80 flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-3 rounded-lg bg-black text-white text-sm font-semibold shadow-lg hover:bg-gray-900 hover:shadow-xl transition-all transform active:scale-95"
        >
          Save Method
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
