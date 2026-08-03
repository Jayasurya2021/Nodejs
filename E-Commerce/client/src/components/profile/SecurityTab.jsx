import { useState, useEffect } from 'react';
import { Shield, Smartphone, Laptop, Tablet, Monitor, AlertTriangle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';

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

  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const { data } = await axios.get('/api/security/sessions', { withCredentials: true });
      if (Array.isArray(data)) {
        setSessions(data);
      }
    } catch (error) {
      console.error('Failed to fetch sessions', error);
    }
  };

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(() => {
      fetchSessions();
    }, 30000); // refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleRevokeSession = async (sessionId) => {
    try {
      await axios.delete(`/api/security/session/${sessionId}`, { withCredentials: true });
      toast.success('Device logged out successfully');
      fetchSessions();
    } catch (error) {
      toast.error('Could not log out device');
    }
  };

  const handleRevokeAllOthers = async () => {
    try {
      await axios.delete('/api/security/logout-all', { withCredentials: true });
      toast.success('All other devices logged out');
      fetchSessions();
    } catch (error) {
      toast.error('Could not log out other devices');
    }
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
          {sessions.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No active login sessions found.</p>
          ) : (
            sessions.map((session) => {
              const deviceStr = (session.deviceName || '').toLowerCase();
              let DeviceIcon = Laptop;
              if (deviceStr.includes('mobile') || deviceStr.includes('iphone') || deviceStr.includes('android')) DeviceIcon = Smartphone;
              else if (deviceStr.includes('tablet') || deviceStr.includes('ipad')) DeviceIcon = Tablet;
              else if (deviceStr.includes('desktop') || deviceStr.includes('pc') || deviceStr.includes('mac')) DeviceIcon = Monitor;

              return (
                <div 
                  key={session.sessionId} 
                  className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-100 rounded-lg gap-4 ${session.isCurrentDevice ? 'bg-gray-50' : ''}`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="mt-1 sm:mt-0 p-3 bg-gray-100 rounded-full text-gray-600">
                      <DeviceIcon size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold flex items-center gap-2">
                        {session.deviceName} 
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {session.browser} • {session.os}
                      </p>
                      <div className="text-xs text-gray-500 mt-2 space-y-1">
                        <p><span className="font-semibold">Location:</span> {session.city}, {session.state}, {session.country}</p>
                        <p><span className="font-semibold">IP Address:</span> {session.ipAddress}</p>
                        <p><span className="font-semibold">Last Active:</span> {session.isCurrentDevice ? 'Active Now' : `${formatDistanceToNow(new Date(session.lastActiveAt))} ago`}</p>
                        <p><span className="font-semibold">Login Time:</span> {format(new Date(session.loginAt), 'dd MMM yyyy, h:mm a')}</p>
                      </div>
                    </div>
                  </div>
                  {session.isCurrentDevice ? (
                    <div className="flex flex-col items-end gap-2 mt-2 sm:mt-0">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100 whitespace-nowrap">
                        Current Device
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-end gap-2 mt-2 sm:mt-0">
                      <button 
                        onClick={() => handleRevokeSession(session.sessionId)}
                        className="text-[10px] font-bold uppercase tracking-widest text-white bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-md shadow-sm whitespace-nowrap w-full sm:w-auto"
                      >
                        Logout Device
                      </button>
                      <button 
                        onClick={() => {
                          handleRevokeSession(session.sessionId);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          toast.error('Device logged out. Please change your password immediately.', { duration: 5000 });
                        }}
                        className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors whitespace-nowrap underline underline-offset-2"
                      >
                        Not You?
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        
        {sessions.length > 1 && (
          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
            <button 
              onClick={handleRevokeAllOthers}
              className="text-xs font-bold uppercase tracking-widest border border-gray-200 px-6 py-2.5 rounded-md hover:border-black transition-colors"
            >
              Log Out All Other Devices
            </button>
          </div>
        )}
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
