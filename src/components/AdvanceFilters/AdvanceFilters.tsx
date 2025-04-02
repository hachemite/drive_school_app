// File: drive-course-app/src/components/AdvancedFilters/AdvancedFilters.tsx
import React, { useState } from 'react';
import { Filter, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

interface AdvancedFiltersProps {
  onApplyFilters: (filters: {
    type: string;
    year: string;
    isFolder: boolean | null;
    minSize: string;
    maxSize: string;
  }) => void;
  onReset: () => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onApplyFilters, onReset }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    year: '',
    isFolder: null as boolean | null,
    minSize: '',
    maxSize: ''
  });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    setShowFilters(false);
  };

  const handleReset = () => {
    setFilters({
      type: '',
      year: '',
      isFolder: null,
      minSize: '',
      maxSize: ''
    });
    onReset();
  };

  return (
    <div className="mb-4">
      {/* Toggle Button */}
      <button 
        onClick={() => setShowFilters(!showFilters)}
        className={`flex items-center gap-2 px-4 py-3 rounded-lg w-full sm:w-auto ${showFilters ? 'bg-[#F1A7A1]' : 'bg-[#ADB2D4] hover:bg-[#C7D9DD]'} text-white transition-colors`}
      >
        <Filter size={18} />
        <span>{showFilters ? 'Hide Filters' : 'Advanced Filters'}</span>
        {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Filters Form */}
      {showFilters && (
        <div className="mt-3 p-4 rounded-lg bg-[#EEF1DA] border border-[#D5E5D5]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* File Type */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#5a5f7c]">File Type</label>
              <input
                type="text"
                name="type"
                value={filters.type}
                onChange={handleInputChange}
                placeholder="jpg, pdf, etc."
                className="w-full px-3 py-2 rounded-lg border border-[#C7D9DD] focus:outline-none focus:ring-2 focus:ring-[#F6B93B] focus:border-transparent"
              />
            </div>

            {/* Year Modified */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#5a5f7c]">Year Modified</label>
              <input
                type="text"
                name="year"
                value={filters.year}
                onChange={handleInputChange}
                placeholder="2023, 2022, etc."
                className="w-full px-3 py-2 rounded-lg border border-[#C7D9DD] focus:outline-none focus:ring-2 focus:ring-[#F6B93B] focus:border-transparent"
              />
            </div>

            {/* Folder/File */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#5a5f7c]">Type</label>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="isFolder"
                    checked={filters.isFolder === true}
                    onChange={() => setFilters(prev => ({ ...prev, isFolder: true }))}
                    className="h-4 w-4 text-[#F6B93B] focus:ring-[#F6B93B] border-[#ADB2D4]"
                  />
                  <span className="text-sm text-[#5a5f7c]">Folders</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="isFolder"
                    checked={filters.isFolder === false}
                    onChange={() => setFilters(prev => ({ ...prev, isFolder: false }))}
                    className="h-4 w-4 text-[#F6B93B] focus:ring-[#F6B93B] border-[#ADB2D4]"
                  />
                  <span className="text-sm text-[#5a5f7c]">Files</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="isFolder"
                    checked={filters.isFolder === null}
                    onChange={() => setFilters(prev => ({ ...prev, isFolder: null }))}
                    className="h-4 w-4 text-[#F6B93B] focus:ring-[#F6B93B] border-[#ADB2D4]"
                  />
                  <span className="text-sm text-[#5a5f7c]">Both</span>
                </label>
              </div>
            </div>

            {/* Size Range */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#5a5f7c]">Size Range (MB)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="minSize"
                  value={filters.minSize}
                  onChange={handleInputChange}
                  placeholder="Min"
                  className="flex-1 px-3 py-2 rounded-lg border border-[#C7D9DD] focus:outline-none focus:ring-2 focus:ring-[#F6B93B] focus:border-transparent"
                />
                <span className="text-[#ADB2D4]">to</span>
                <input
                  type="number"
                  name="maxSize"
                  value={filters.maxSize}
                  onChange={handleInputChange}
                  placeholder="Max"
                  className="flex-1 px-3 py-2 rounded-lg border border-[#C7D9DD] focus:outline-none focus:ring-2 focus:ring-[#F6B93B] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={handleApply}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F6B93B] hover:bg-[#FAD7A1] text-white transition-colors"
            >
              <Check size={16} />
              Apply Filters
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ADB2D4] hover:bg-[#C7D9DD] text-white transition-colors"
            >
              <X size={16} />
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;