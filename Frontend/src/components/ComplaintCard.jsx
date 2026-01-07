import React from 'react';
import { Link } from 'react-router-dom';

const ComplaintCard = ({ complaint, showUser = false }) => {
    const getStatusColor = (status) => {
        const s = (status || '').toLowerCase().replace(/\s+/g, '-');
        switch (s) {
            case 'pending':
                return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'resolved':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            default:
                return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-slate-100 flex flex-col h-full">
            {complaint.imageUrl && (
                <img
                    src={complaint.imageUrl}
                    alt={complaint.title}
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                        {complaint.category}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{complaint.title}</h3>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span className="truncate">{complaint.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {complaint.description}
                </p>

                {showUser && complaint.userName && (
                    <div className="mb-3 text-xs text-gray-500 border-t pt-2">
                        Reported by: <span className="font-medium">{complaint.userName}</span>
                    </div>
                )}

                <Link
                    to={`/complaint/${complaint.id}`}
                    className="mt-auto w-full block text-center bg-gray-50 text-blue-600 font-medium py-2 rounded border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ComplaintCard;
