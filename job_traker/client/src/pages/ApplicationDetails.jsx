import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Globe,
  ExternalLink,
  Edit2,
  Trash2,
  Clock,
  FileText,
  MessageSquare,
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import StatusTimeline from '../components/StatusTimeline';
import Toast from '../components/Toast';
import { applicationAPI } from '../services/api';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await applicationAPI.getApplicationById(id);
      if (res.success) {
        setApplication(res.data);
      }
    } catch (err) {
      console.error('Error fetching application details:', err);
      setToastMessage('Failed to load application details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const res = await applicationAPI.updateStatus(id, newStatus);
      if (res.success) {
        setApplication(res.data);
        setToastMessage(`Status changed to ${newStatus}`);
      }
    } catch (err) {
      setToastMessage('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete the application for ${application.jobRole} at ${application.companyName}?`
      )
    ) {
      try {
        await applicationAPI.deleteApplication(id);
        setToastMessage('Application deleted successfully.');
        setTimeout(() => navigate('/applications'), 1000);
      } catch (err) {
        setToastMessage('Failed to delete application.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl my-12">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          Application Not Found
        </h3>
        <button
          onClick={() => navigate('/applications')}
          className="mt-4 px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-sm"
        >
          Back to Applications
        </button>
      </div>
    );
  }

  const {
    companyName,
    companyLogo,
    jobRole,
    jobUrl,
    companyWebsite,
    location,
    workType,
    salary,
    appliedDate,
    status,
    interviewDate,
    jobDescription,
    notes,
  } = application;

  const initials = companyName
    ? companyName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'J';

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Action Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/applications')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </button>

        <div className="flex items-center gap-2">
          <Link
            to={`/applications/${id}/edit`}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>

      {/* Main Banner Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-5">
            {companyLogo && !imgError ? (
              <img
                src={companyLogo}
                alt={companyName}
                onError={() => setImgError(true)}
                className="w-16 h-16 rounded-2xl object-contain bg-slate-50 dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                {initials}
              </div>
            )}

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                {jobRole}
              </h1>
              <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                {companyName}
              </p>
            </div>
          </div>

          <StatusBadge status={status} />
        </div>

        {/* Visual Workflow Timeline */}
        <div className="my-6">
          <p className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
            Status Timeline (Click stage to update)
          </p>
          <StatusTimeline currentStatus={status} onSelectStatus={handleStatusUpdate} />
        </div>

        {/* Detailed Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 my-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Location
            </span>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {location || 'Remote'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" /> Work Type
            </span>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {workType}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Applied Date
            </span>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {appliedDate
                ? new Date(appliedDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'N/A'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> Salary
            </span>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {salary || 'Not specified'}
            </p>
          </div>
        </div>

        {/* Links & Upcoming Interview info */}
        <div className="flex flex-wrap items-center gap-4 py-3">
          {jobUrl && (
            <a
              href={jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold text-xs border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Original Job Posting
            </a>
          )}

          {companyWebsite && (
            <a
              href={companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              Company Website
            </a>
          )}

          {interviewDate && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-semibold text-xs border border-purple-200 dark:border-purple-800">
              <Clock className="w-3.5 h-3.5 text-purple-500 animate-pulse" />
              Interview Scheduled:{' '}
              {new Date(interviewDate).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          )}
        </div>

        {/* Job Description */}
        {jobDescription && (
          <div className="mt-8 space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              Job Description
            </h3>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {jobDescription}
            </div>
          </div>
        )}

        {/* Personal Notes */}
        {notes && (
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-500" />
              Personal Notes & Logs
            </h3>
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line italic">
              {notes}
            </div>
          </div>
        )}
      </div>

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default ApplicationDetails;
