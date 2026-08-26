import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Plus, Briefcase, RefreshCw } from 'lucide-react';
import SearchFilter from '../components/SearchFilter';
import ApplicationCard from '../components/ApplicationCard';
import Toast from '../components/Toast';
import { applicationAPI } from '../services/api';

const Applications = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'All');
  const [selectedWorkType, setSelectedWorkType] = useState(searchParams.get('workType') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedStatus && selectedStatus !== 'All') params.status = selectedStatus;
      if (selectedWorkType && selectedWorkType !== 'All') params.workType = selectedWorkType;
      if (sortBy) params.sort = sortBy;

      const res = await applicationAPI.getApplications(params);
      if (res.success) {
        setApplications(res.data);
      }
    } catch (err) {
      console.error('Error loading applications:', err);
      setToastMessage('Error loading applications');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedStatus, selectedWorkType, sortBy]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All');
    setSelectedWorkType('All');
    setSortBy('newest');
    setSearchParams({});
  };

  const handleDelete = async (id, company, role) => {
    if (window.confirm(`Are you sure you want to delete the application for ${role} at ${company}?`)) {
      try {
        await applicationAPI.deleteApplication(id);
        setToastMessage('Application deleted successfully.');
        setApplications((prev) => prev.filter((app) => app._id !== id));
      } catch (err) {
        setToastMessage('Failed to delete application.');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await applicationAPI.updateStatus(id, newStatus);
      setToastMessage(`Status updated to ${newStatus}`);
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      setToastMessage('Failed to update status.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Job Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage, filter, and track all your target jobs and interviews ({applications.length} items)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchApplications}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => navigate('/add-application')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            + Add Application
          </button>
        </div>
      </div>

      {/* Search & Filter Component */}
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedWorkType={selectedWorkType}
        setSelectedWorkType={setSelectedWorkType}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={handleResetFilters}
      />

      {/* Applications Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : applications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <ApplicationCard
              key={app._id}
              application={app}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl space-y-4 my-6">
          <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              No matching applications found
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Try adjusting your search query, status, or work type filters to discover more results.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default Applications;
