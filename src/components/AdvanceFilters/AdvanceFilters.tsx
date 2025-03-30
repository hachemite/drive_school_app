// File: drive-course-app/src/components/AdvancedFilters/AdvancedFilters.tsx
import React, { useState } from 'react';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters(prev => ({ ...prev, [name]: checked }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
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
    <div className="advanced-filters">
      <button 
        onClick={() => setShowFilters(!showFilters)}
        className="toggle-filters-btn"
      >
        {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
      </button>

      {showFilters && (
        <div className="filters-form">
          <div className="filter-group">
            <label>File Type:</label>
            <input
              type="text"
              name="type"
              value={filters.type}
              onChange={handleInputChange}
              placeholder="e.g., image/jpeg, application/pdf"
            />
          </div>

          <div className="filter-group">
            <label>Year Modified:</label>
            <input
              type="text"
              name="year"
              value={filters.year}
              onChange={handleInputChange}
              placeholder="e.g., 2023"
            />
          </div>

          <div className="filter-group">
            <label>Folder/File:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="isFolder"
                  checked={filters.isFolder === true}
                  onChange={() => setFilters(prev => ({ ...prev, isFolder: true }))}
                />
                Folders Only
              </label>
              <label>
                <input
                  type="radio"
                  name="isFolder"
                  checked={filters.isFolder === false}
                  onChange={() => setFilters(prev => ({ ...prev, isFolder: false }))}
                />
                Files Only
              </label>
              <label>
                <input
                  type="radio"
                  name="isFolder"
                  checked={filters.isFolder === null}
                  onChange={() => setFilters(prev => ({ ...prev, isFolder: null }))}
                />
                Both
              </label>
            </div>
          </div>

          <div className="filter-group">
            <label>Size Range (MB):</label>
            <div className="size-range">
              <input
                type="number"
                name="minSize"
                value={filters.minSize}
                onChange={handleInputChange}
                placeholder="Min"
              />
              <span>to</span>
              <input
                type="number"
                name="maxSize"
                value={filters.maxSize}
                onChange={handleInputChange}
                placeholder="Max"
              />
            </div>
          </div>

          <div className="filter-actions">
            <button type="button" onClick={handleApply} className="apply-btn">
              Apply Filters
            </button>
            <button type="button" onClick={handleReset} className="reset-btn">
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;