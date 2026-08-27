import React, { useEffect, useState } from 'react';
import { Bookmark, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApplicationCard from '../components/ApplicationCard';
import Toast from '../components/Toast';
import { applicationAPI } from '../services/api';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await applicationAPI.getApplications({ status: 'Wishlist' });
      if (res.success) {
        setWishlist(res.data);
      }
    } catch (err) {
      console.error('Error loading wishlist:', err);
      setToastMessage('Failed to load wishlist.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleDelete = async (id, company, role) => {
    if (window.confirm(`Delete application for ${role} at ${company}?`)) {
      try {
        await applicationAPI.deleteApplication(id);
        setToastMessage('Deleted item');
        setWishlist((prev) => prev.filter((app) => app._id !== id));
      } catch (err) {
        setToastMessage('Failed to delete.');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await applicationAPI.updateStatus(id, newStatus);
      setToastMessage(`Status updated to ${newStatus}`);
      fetchWishlist();
    } catch (err) {
      setToastMessage('Failed to update status.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4a708b] mb-1">
            <Bookmark className="w-4 h-4 text-[#1f3144]" /> Bookmarks
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1f3144] tracking-tight">
            Job Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#4a708b] font-medium mt-1">
            Saved job postings you intend to customize resumes for and submit
          </p>
        </div>

        <button
          onClick={() => navigate('/add-application')}
          className="px-4 py-2.5 rounded-xl bg-[#1f3144] hover:bg-[#142230] text-[#efe6d5] font-bold text-xs shadow-md shadow-[#1f3144]/20 flex items-center gap-1.5 cursor-pointer hover:scale-[1.01]"
        >
          <Plus className="w-4 h-4 text-[#efe6d5]" /> Save New Wishlist Job
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="w-8 h-8 border-4 border-[#1f3144] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((app) => (
            <ApplicationCard
              key={app._id}
              application={app}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-dashed border-[#d8cebd] rounded-3xl space-y-3 shadow-xs">
          <Bookmark className="w-12 h-12 text-[#4a708b] mx-auto" />
          <h3 className="text-lg font-extrabold text-[#1f3144]">
            Your wishlist is empty
          </h3>
          <p className="text-xs text-[#4a708b] max-w-sm mx-auto font-medium">
            Save interesting job openings as Wishlist items before applying!
          </p>
        </div>
      )}

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default Wishlist;


