import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedWorkType,
  setSelectedWorkType,
  sortBy,
  setSortBy,
  onReset,
}) => {
  const statuses = [
    'All',
    'Wishlist',
    'Applied',
    'Screening',
    'Interview',
    'Technical Round',
    'Final Round',
    'Offer',
    'Rejected',
  ];

  const workTypes = ['All', 'Remote', 'Hybrid', 'On-site'];

  const isFiltered =
    searchTerm !== '' ||
    selectedStatus !== 'All' ||
    selectedWorkType !== 'All' ||
    sortBy !== 'newest';

  return (
    <div className="bg-white border border-[#d8cebd] rounded-2xl p-4 shadow-xs mb-6 transition-colors">
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a708b]" />
          <input
            type="text"
            placeholder="Search company, job role, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f4f0e6]/60 border border-[#d8cebd] text-sm text-[#1f3144] placeholder-[#4a708b]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4a708b]/30 focus:border-[#4a708b] transition-all font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a708b] hover:text-[#1f3144]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {/* Status Filter */}
          <div className="relative flex items-center">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#f4f0e6]/60 border border-[#d8cebd] text-xs font-semibold text-[#1f3144] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4a708b]/30 cursor-pointer"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  Status: {st}
                </option>
              ))}
            </select>
          </div>

          {/* Work Type Filter */}
          <div className="relative flex items-center">
            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#f4f0e6]/60 border border-[#d8cebd] text-xs font-semibold text-[#1f3144] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4a708b]/30 cursor-pointer"
            >
              {workTypes.map((wt) => (
                <option key={wt} value={wt}>
                  Work: {wt}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#f4f0e6]/60 border border-[#d8cebd] text-xs font-semibold text-[#1f3144] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4a708b]/30 cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="companyAsc">Sort: Company (A-Z)</option>
              <option value="companyDesc">Sort: Company (Z-A)</option>
            </select>
          </div>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              onClick={onReset}
              className="px-3.5 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;


