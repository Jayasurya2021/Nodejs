import { useState, useEffect } from 'react';
import { FiCheck, FiMapPin, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AddressForm = ({
  initialData,
  onSubmit,
  onCancel,
  isCheckoutMode = false
}) => {
  const [address, setAddress] = useState({
    fullName: '',
    mobile: '',
    street: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    label: 'Home',
    isDefault: false,
    ...initialData
  });

  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  useEffect(() => {
    if (initialData) {
      setAddress(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress({ 
      ...address, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    
    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          
          if (!response.ok) throw new Error('Failed to fetch data');
          const data = await response.json();
          
          if (data && data.address) {
            setAddress((prev) => ({
              ...prev,
              street: data.address.road || data.address.suburb || data.address.neighbourhood || '',
              city: data.address.city || data.address.town || data.address.village || data.address.county || '',
              state: data.address.state || '',
              postalCode: data.address.postcode || '',
              country: data.address.country || ''
            }));
            toast.success('Location fetched successfully!');
          }
        } catch (error) {
          toast.error('Failed to fetch address details');
        } finally {
          setIsFetchingLocation(false);
        }
      },
      (error) => {
        setIsFetchingLocation(false);
        toast.error('Location permission denied or unavailable');
      },
      { timeout: 10000 }
    );
  };

  const validateForm = () => {
    if (!address.fullName || !address.mobile || !address.street || !address.city || !address.state || !address.postalCode || !address.country) {
      toast.error('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Pass 'true' for shouldSave (always save to profile when editing/adding in this flow)
    onSubmit(address, true);
  };

  return (
    <div className="bg-white rounded-[12px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white sticky top-0 z-10">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          {initialData?._id ? 'Edit Address' : 'Add New Address'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Scrollable Form Body */}
      <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-gray-50/50">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 font-medium">Contact Details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Full Name *</label>
            <input
              type="text" name="fullName" value={address.fullName} onChange={handleAddressChange} required
              placeholder="John Doe"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Mobile Number *</label>
            <input
              type="text" name="mobile" value={address.mobile} onChange={handleAddressChange} required
              placeholder="+91 9876543210"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 font-medium">Address Details</p>
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={isFetchingLocation}
            className="text-xs font-semibold flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50 bg-blue-50 px-3 py-1.5 rounded-full"
          >
            {isFetchingLocation ? (
              <span className="flex items-center gap-1.5">
                <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Locating...
              </span>
            ) : (
              <>
                <FiMapPin size={12} />
                Use Current Location
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Address Line 1 (Street) *</label>
            <input
              type="text" name="street" value={address.street} onChange={handleAddressChange} required
              placeholder="House No, Building, Street Name"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Address Line 2 (Optional)</label>
            <input
              type="text" name="addressLine2" value={address.addressLine2} onChange={handleAddressChange}
              placeholder="Apartment, Suite, Unit"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Landmark (Optional)</label>
            <input
              type="text" name="landmark" value={address.landmark} onChange={handleAddressChange}
              placeholder="E.g. Near Apollo Hospital"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Pincode *</label>
            <input
              type="text" name="postalCode" value={address.postalCode} onChange={handleAddressChange} required
              placeholder="400001"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">City *</label>
            <input
              type="text" name="city" value={address.city} onChange={handleAddressChange} required
              placeholder="Mumbai"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">State *</label>
            <input
              type="text" name="state" value={address.state} onChange={handleAddressChange} required
              placeholder="Maharashtra"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Country *</label>
            <input
              type="text" name="country" value={address.country} onChange={handleAddressChange} required
              placeholder="India"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-6 border-t border-gray-200">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-3 block">Save Address As</label>
            <div className="flex gap-4">
              {['Home', 'Work', 'Other'].map(lbl => (
                <label key={lbl} className={`flex-1 py-2.5 px-4 rounded-lg border text-center cursor-pointer transition-all ${address.label === lbl ? 'border-black bg-black text-white font-medium shadow-md' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'}`}>
                  <input
                    type="radio" name="label" value={lbl}
                    checked={address.label === lbl}
                    onChange={handleAddressChange}
                    className="sr-only"
                  />
                  <span className="text-sm">{lbl}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer group w-max">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                name="isDefault"
                checked={address.isDefault}
                onChange={handleAddressChange}
                className="w-5 h-5 appearance-none border-2 border-gray-300 rounded-[4px] checked:bg-black checked:border-black transition-colors cursor-pointer"
              />
              {address.isDefault && <FiCheck className="absolute text-white pointer-events-none" size={14} strokeWidth={4} />}
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">
              Set as Default Address
            </span>
          </label>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/80 flex justify-end gap-4 sticky bottom-0 z-10">
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
          Save Address
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
