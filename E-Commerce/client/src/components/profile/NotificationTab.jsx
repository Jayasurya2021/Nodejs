import { useState } from 'react';

const NotificationTab = () => {
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    offers: false,
    priceDrops: true,
    wishlistAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const handleToggle = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleSwitch = ({ label, description, stateKey }) => (
    <div className="flex items-center justify-between py-5 border-b border-gray-100 last:border-0">
      <div>
        <h3 className="text-sm font-bold">{label}</h3>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      <button 
        onClick={() => handleToggle(stateKey)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          preferences[stateKey] ? 'bg-black' : 'bg-gray-200'
        }`}
      >
        <span 
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            preferences[stateKey] ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:p-8">
      <h2 className="text-xl font-bold tracking-wide mb-1">Notification Preferences</h2>
      <p className="text-sm text-gray-500 mb-8">Choose what you want to be notified about</p>

      <div className="space-y-2">
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Shopping Alerts</h3>
          <ToggleSwitch 
            label="Order Updates" 
            description="Get notified about your order status, shipping, and delivery."
            stateKey="orderUpdates" 
          />
          <ToggleSwitch 
            label="Exclusive Offers" 
            description="Receive early access to sales, promotions, and personalized offers."
            stateKey="offers" 
          />
          <ToggleSwitch 
            label="Price Drops" 
            description="Get alerted when items in your wishlist or cart drop in price."
            stateKey="priceDrops" 
          />
          <ToggleSwitch 
            label="Wishlist Alerts" 
            description="Know when your favorite items are low in stock or back in stock."
            stateKey="wishlistAlerts" 
          />
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Notification Methods</h3>
          <ToggleSwitch 
            label="Email Notifications" 
            description="Receive updates directly to your registered email address."
            stateKey="emailNotifications" 
          />
          <ToggleSwitch 
            label="SMS Notifications" 
            description="Get text messages for important time-sensitive updates."
            stateKey="smsNotifications" 
          />
          <ToggleSwitch 
            label="Push Notifications" 
            description="Receive alerts directly on your device."
            stateKey="pushNotifications" 
          />
        </div>
      </div>
      
      <div className="pt-8 flex justify-end">
        <button className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-md shadow-sm">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationTab;
