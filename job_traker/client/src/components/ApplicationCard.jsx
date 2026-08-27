import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  ChevronDown,
  Clock,
} from 'lucide-react';
import StatusBadge from './StatusBadge';

// Generate consistent background color based on company name hash
const getAvatarBg = (name = '') => {
  const colors = [
    'bg-[#1f3144]',
    'bg-[#4a708b]',
    'bg-[#35526c]',
    'bg-[#2b4156]',
    'bg-[#172533]',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const ApplicationCard = ({ application, onDelete, onStatusChange }) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [imgError, setImgError] = useState(false);

  const {
    _id,
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

  const formattedAppliedDate = appliedDate
    ? new Date(appliedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'N/A';

  const formattedInterviewDate = interviewDate
    ? new Date(interviewDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const statuses = [
    'Wishlist',
    'Applied',
    'Screening',
    'Interview',
    'Technical Round',
    'Final Round',
    'Offer',
    'Rejected',
  ];

  return (
    <div className="group relative bg-white border border-[#d8cebd] hover:border-[#4a708b] rounded-2xl p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            {/* Logo or Initials Avatar */}
            {companyLogo && !imgError ? (
              <img
                src={companyLogo}
                alt={companyName}
                onError={() => setImgError(true)}
                className="w-12 h-12 rounded-xl object-contain bg-slate-50 p-1 border border-[#d8cebd] shadow-2xs"
              />
            ) : (
              <div
                className={`w-12 h-12 rounded-xl ${getAvatarBg(
                  companyName
                )} text-[#efe6d5] font-extrabold text-lg flex items-center justify-center shadow-md shadow-[#1f3144]/15`}
              >
                {initials}
              </div>
            )}

            <div>
              <h4 className="font-extrabold text-[#1f3144] text-base leading-tight group-hover:text-[#4a708b] transition-colors">
                {jobRole}
              </h4>
              <p className="text-sm font-semibold text-[#4a708b] mt-0.5">
                {companyName}
              </p>
            </div>
          </div>

          {/* Quick Status Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center gap-1 focus:outline-none cursor-pointer"
            >
              <StatusBadge status={status} />
              <ChevronDown className="w-3.5 h-3.5 text-[#4a708b] hover:text-[#1f3144]" />
            </button>

            {showStatusDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-[#d8cebd] rounded-xl shadow-xl z-30 py-1.5 animate-in fade-in zoom-in-95">
                <p className="px-3 py-1 text-[10px] uppercase font-extrabold text-[#4a708b] tracking-wider">
                  Change Status
                </p>
                {statuses.map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      onStatusChange && onStatusChange(_id, st);
                      setShowStatusDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#f4f0e6] transition-colors flex items-center justify-between cursor-pointer ${
                      st === status ? 'text-[#1f3144] font-bold' : 'text-[#4a708b]'
                    }`}
                  >
                    {st}
                    {st === status && <span className="w-1.5 h-1.5 rounded-full bg-[#1f3144]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-[#4a708b] my-3">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#4a708b] shrink-0" />
            <span className="truncate font-medium">{location || 'Remote'}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#4a708b] shrink-0" />
            <span className="px-2 py-0.5 rounded-md bg-[#f4f0e6] border border-[#d8cebd] text-[11px] font-bold text-[#1f3144]">
              {workType}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#4a708b] shrink-0" />
            <span className="font-medium">Applied: {formattedAppliedDate}</span>
          </div>

          {salary && (
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-bold text-emerald-600 truncate">
                {salary}
              </span>
            </div>
          )}
        </div>

        {/* Upcoming Interview Tag */}
        {formattedInterviewDate && (
          <div className="mt-3 p-2 rounded-xl bg-[#f4f0e6] border border-[#4a708b]/40 flex items-center gap-2 text-xs text-[#1f3144] font-semibold">
            <Clock className="w-3.5 h-3.5 text-[#4a708b] animate-pulse shrink-0" />
            <span className="truncate">Interview: {formattedInterviewDate}</span>
          </div>
        )}

        {/* Notes Preview */}
        {notes && (
          <p className="mt-3 text-xs text-[#1f3144] line-clamp-2 italic bg-[#f4f0e6]/60 p-2.5 rounded-xl border border-[#d8cebd] font-serif">
            "{notes}"
          </p>
        )}
      </div>

      {/* Card Actions Footer */}
      <div className="mt-5 pt-3 border-t border-[#d8cebd]/60 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {jobUrl && (
            <a
              href={jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-[#4a708b] hover:text-[#1f3144] rounded-lg hover:bg-[#f4f0e6] transition-colors"
              title="Visit Job Listing"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Link
            to={`/applications/${_id}`}
            className="p-1.5 text-[#1f3144] hover:text-[#4a708b] rounded-lg hover:bg-[#f4f0e6] transition-colors flex items-center gap-1 text-xs font-bold"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
            View
          </Link>

          <Link
            to={`/applications/${_id}/edit`}
            className="p-1.5 text-[#4a708b] hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
            title="Edit Application"
          >
            <Edit2 className="w-4 h-4" />
          </Link>

          <button
            onClick={() => onDelete && onDelete(_id, companyName, jobRole)}
            className="p-1.5 text-[#4a708b] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
            title="Delete Application"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;


