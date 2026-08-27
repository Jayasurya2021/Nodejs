import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Plus, Briefcase, RefreshCw, LayoutGrid, List, MoreVertical } from 'lucide-react';
import SearchFilter from '../components/SearchFilter';
import ApplicationCard from '../components/ApplicationCard';
import StatusBadge from '../components/StatusBadge';
import Toast from '../components/Toast';
import { applicationAPI } from '../services/api';

// Generate logo avatar fallback background color
const getAvatarBg = (name = '') => {
  const colors = [
    'bg-[#1c1611]',
    'bg-[#000000]',
    'bg-[#3d2d1d]',
    'bg-[#2d2117]',
    'bg-[#4a3825]',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const Applications = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

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
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#000000] tracking-tight">
              Job Applications
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#e6e1d3] border border-[#d8d2c4] text-[#000000] text-xs font-black">
              {applications.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#3d2d1d] font-medium mt-1">
            Manage, filter, and track all your target jobs and interview pipelines
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Grid vs Table View Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-white border border-[#d8d2c4] shadow-2xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#1c1611] text-[#e6e1d3] shadow-2xs' : 'text-[#3d2d1d] hover:text-[#000000]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-[#1c1611] text-[#e6e1d3] shadow-2xs' : 'text-[#3d2d1d] hover:text-[#000000]'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={fetchApplications}
            className="p-2.5 rounded-xl border border-[#d8d2c4] bg-white text-[#3d2d1d] hover:bg-[#f0ece1] transition-colors shadow-2xs cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => navigate('/add-application')}
            className="px-4 py-2.5 rounded-xl bg-[#1c1611] hover:bg-[#000000] text-[#e6e1d3] font-bold text-xs shadow-md shadow-black/20 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.01]"
          >
            <Plus className="w-4 h-4 text-[#e6e1d3]" />
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

      {/* Applications Grid or Table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="w-8 h-8 border-4 border-[#1c1611] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : applications.length > 0 ? (
        viewMode === 'grid' ? (
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
          <div className="bg-white border border-[#d8d2c4] rounded-3xl p-6 shadow-2xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#d8d2c4] text-[11px] font-extrabold uppercase tracking-wider text-[#3d2d1d]">
                  <th className="py-3 px-4">Job Title</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Work Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Applied On</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8d2c4]/60 font-medium text-slate-800">
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-[#f0ece1]/60 transition-colors group cursor-pointer"
                    onClick={() => navigate(`/applications/${app._id}`)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-[#000000] text-sm group-hover:text-[#3d2d1d] transition-colors">
                        {app.jobRole}
                      </div>
                      <p className="text-[11px] text-[#3d2d1d]/80 font-semibold mt-0.5">
                        {app.location || 'Remote'}
                      </p>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        {app.companyLogo ? (
                          <img
                            src={app.companyLogo}
                            alt={app.companyName}
                            className="w-7 h-7 rounded-lg object-contain bg-slate-50 border border-slate-200 p-0.5"
                          />
                        ) : (
                          <div
                            className={`w-7 h-7 rounded-lg ${getAvatarBg(
                              app.companyName
                            )} text-[#e6e1d3] font-bold text-xs flex items-center justify-center`}
                          >
                            {app.companyName ? app.companyName[0] : 'J'}
                          </div>
                        )}
                        <span className="font-bold text-[#000000]">{app.companyName}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-[#e6e1d3] border border-[#d8d2c4] text-[11px] font-bold text-[#000000]">
                        {app.workType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={app.status} size="small" />
                    </td>

                    <td className="py-3.5 px-4 text-[#3d2d1d] font-bold">
                      {app.appliedDate
                        ? new Date(app.appliedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'N/A'}
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(app._id, app.companyName, app.jobRole)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Application"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="p-12 text-center bg-white border border-dashed border-[#d8d2c4] rounded-3xl space-y-4 my-6 shadow-2xs">
          <Briefcase className="w-12 h-12 text-[#3d2d1d]/60 mx-auto" />
          <div>
            <h3 className="text-lg font-extrabold text-[#000000]">
              No matching applications found
            </h3>
            <p className="text-xs text-[#3d2d1d] max-w-md mx-auto mt-1 font-medium">
              Try adjusting your search query, status, or work type filters to discover more results.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-[#e6e1d3] text-[#000000] text-xs font-bold hover:bg-[#3d2d1d] hover:text-[#e6e1d3] transition-colors cursor-pointer"
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




