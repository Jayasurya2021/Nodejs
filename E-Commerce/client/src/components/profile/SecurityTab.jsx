import { useState } from 'react';
import { Shield, Smartphone, Laptop, AlertTriangle } from 'lucide-react';

const SecurityTab = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert('Password change requested');
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-black" size={24} />
          <div>
            <h2 className="text-xl font-bold tracking-wide">Change Password</h2>
            <p className="text-sm text-gray-500">Ensure your account is using a long, random password to stay secure.</p>
          </div>
        </div>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-5 max-w-lg">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-600">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-600">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-600">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-md shadow-sm"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Two-Factor Auth */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:p-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-lg font-bold tracking-wide mb-1">Two-Factor Authentication (2FA)</h2>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
          </div>
          <button className="border border-gray-200 px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:border-black transition-colors rounded-md">
            Enable 2FA
          </button>
        </div>
      </div>

      {/* Login Devices */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:p-8">
        <h2 className="text-lg font-bold tracking-wide mb-6">Login Devices</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg bg-gray-50">
            <div className="flex items-center gap-4">
              <Laptop size={24} className="text-gray-400" />
              <div>
                <p className="text-sm font-bold">MacBook Pro - Chrome</p>
                <p className="text-xs text-gray-500 mt-1">Mumbai, India • Active Now</p>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
              Current Device
            </span>
          </div>
          
          <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center gap-4">
              <Smartphone size={24} className="text-gray-400" />
              <div>
                <p className="text-sm font-bold">iPhone 13 - Safari</p>
                <p className="text-xs text-gray-500 mt-1">Delhi, India • Last active: 2 hours ago</p>
              </div>
            </div>
            <button className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors">
              Log Out
            </button>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
          <button className="text-xs font-bold uppercase tracking-widest border border-gray-200 px-6 py-2.5 rounded-md hover:border-black transition-colors">
            Log Out All Other Devices
          </button>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-red-50 rounded-xl border border-red-100 shadow-sm p-6 lg:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-wide text-red-700 flex items-center gap-2">
            <AlertTriangle size={18} /> Delete Account
          </h2>
          <p className="text-sm text-red-600/80 mt-1">Permanently delete your account and all of your data.</p>
        </div>
        <button className="bg-red-600 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors rounded-md shadow-sm">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SecurityTab;
