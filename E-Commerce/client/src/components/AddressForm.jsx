import { useState, useEffect } from 'react';
import { FiCheck, FiMapPin, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AddressForm = ({
  initialData,
  onSubmit,
  onCancel,
  isCheckoutMode = false
}) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: '',
    state: '',
    label: 'Home',
    ...initialData
  });
  
  // If in checkout mode, we can optionally save to profile.
  // If not in checkout mode (e.g. from Profile page), it's ALWAYS saving to profile.
  const [saveAddressToProfile, setSaveAddressToProfile] = useState(isCheckoutMode ? (initialData?._id ? true : false) : true);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  useEffect(() => {
    if (initialData) {
      setAddress(prev => ({ ...prev, ...initialData }));
      if (isCheckoutMode && initialData._id) {
        setSaveAddressToProfile(true);
      }
    }
  }, [initialData, isCheckoutMode]);

  const handleAddressChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

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

  const validateShipping = () => {
    if (!address.street || !address.city || !address.postalCode || !address.country || !address.state) {
      toast.error('Please fill in all address fields');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateShipping()) return;
    
    // In profile mode, we always save. In checkout, we only save if checked.
    const shouldSaveToProfile = isCheckoutMode ? saveAddressToProfile : true;
    onSubmit(address, shouldSaveToProfile);
  };

  return (
    <div className="bg-white">
      {/* Header & Location Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <FiMapPin className="text-gray-400" size={20} />
          <h2 className="text-lg font-black uppercase tracking-widest">
            {initialData?._id ? 'Edit Address' : (isCheckoutMode ? 'Shipping Address' : 'New Address')}
          </h2>
        </div>
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={isFetchingLocation}
          className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-gray-500 hover:text-black transition-colors disabled:opacity-50"
        >
          {isFetchingLocation ? (
            <span className="flex items-center gap-2">
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

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Street Address *</label>
          <input
            type="text" name="street" value={address.street} onChange={handleAddressChange} required
            placeholder="123 Main Street, Apt 4B"
            className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">City *</label>
          <input
            type="text" name="city" value={address.city} onChange={handleAddressChange} required
            placeholder="Mumbai"
            className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">State / Province *</label>
          <input
            type="text" name="state" value={address.state} onChange={handleAddressChange} required
            placeholder="Maharashtra"
            className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Postal Code *</label>
          <input
            type="text" name="postalCode" value={address.postalCode} onChange={handleAddressChange} required
            placeholder="400001"
            className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Country *</label>
          <input
            type="text" name="country" value={address.country} onChange={handleAddressChange} required
            placeholder="India"
            className="w-full border border-gray-200 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>
        
        {/* Save Options */}
        <div className="md:col-span-2 mt-2 pt-4 border-t border-gray-100 flex flex-col justify-start gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {isCheckoutMode ? (
              <label className="flex items-center gap-3 cursor-pointer group w-max">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={saveAddressToProfile}
                    onChange={(e) => setSaveAddressToProfile(e.target.checked)}
                    className="w-5 h-5 appearance-none border-2 border-gray-300 rounded checked:bg-black checked:border-black transition-colors cursor-pointer"
                  />
                  {saveAddressToProfile && <FiCheck className="absolute text-white pointer-events-none" size={14} strokeWidth={4} />}
                </div>
                <span className="text-xs font-black tracking-widest uppercase text-gray-600 group-hover:text-black transition-colors">
                  Save this address to my profile
                </span>
              </label>
            ) : (
              <span className="text-xs font-bold tracking-widest uppercase text-gray-600">
                Address will be saved to your profile
              </span>
            )}

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="text-xs text-gray-500 hover:text-black underline underline-offset-2 transition-colors uppercase tracking-widest font-bold"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Show label options if saving to profile (in checkout, if checked; in profile, always) */}
          {(isCheckoutMode ? saveAddressToProfile : true) && (
            <div className="flex flex-col gap-2 bg-gray-50 p-4 border border-gray-200">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500 block">Save as</label>
              <div className="flex gap-6">
                {['Home', 'Work', 'Other'].map(lbl => (
                  <label key={lbl} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio" name="label" value={lbl}
                      checked={address.label === lbl}
                      onChange={handleAddressChange}
                      className="accent-black w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-black transition-colors">{lbl}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      {isCheckoutMode ? (
        <button
          onClick={handleSubmit}
          className="mt-8 w-full py-4 bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center justify-center gap-3 group"
        >
          Continue to Payment
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="mt-8 w-full py-4 bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-gray-900 transition-colors"
        >
          Save Address
        </button>
      )}
    </div>
  );
};

export default AddressForm;
