import React, { useEffect, useState } from 'react';
import { Video, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApplicationCard from '../components/ApplicationCard';
import Toast from '../components/Toast';
import { applicationAPI } from '../services/api';

const Interviews = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await applicationAPI.getApplications();
      if (res.success) {
        // Filter jobs that are in interview stages or have an interviewDate set
        const filtered = res.data.filter(
          (app) =>
            ['Interview', 'Technical Round', 'Final Round'].includes(app.status) ||
            Boolean(app.interviewDate)
        );
        setInterviews(filtered);
      }
    } catch (err) {
      console.error('Error loading interviews:', err);
      setToastMessage('Error loading interviews list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleDelete = async (id, company, role) => {
    if (window.confirm(`Delete application for ${role} at ${company}?`)) {
      try {
        await applicationAPI.deleteApplication(id);
        setToastMessage('Deleted application');
        setInterviews((prev) => prev.filter((app) => app._id !== id));
      } catch (err) {
        setToastMessage('Failed to delete application.');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await applicationAPI.updateStatus(id, newStatus);
      setToastMessage(`Status updated to ${newStatus}`);
      fetchInterviews();
    } catch (err) {
      setToastMessage('Failed to update status.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
            <Video className="w-4 h-4" /> Interview Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Scheduled Interviews ({interviews.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            All screening sessions, technical rounds, and final interviews in one hub
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : interviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((app) => (
            <ApplicationCard
              key={app._id}
              application={app}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-3">
          <Clock className="w-12 h-12 text-purple-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            No active interviews scheduled yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            When you update an application to Interview, Technical Round, or Final Round status, it will automatically appear here!
          </p>
        </div>
      )}

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default Interviews;
