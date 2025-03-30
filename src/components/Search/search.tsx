// File: drive-course-app/src/components/SearchComponent/SearchComponent.tsx
import React, { useState } from 'react';
import { useSearch } from '../../hooks/useSearch';
import FileandFolderList from '../../pages/FileandFolderList';
import { useHistory } from 'react-router-dom';
import AdvancedFilters from '../AdvanceFilters/AdvanceFilters';

interface SearchComponentProps {
    currentDrive?: string;
    onSearchActive?: (isActive: boolean) => void;
    onFiltersChange?: (hasFilters: boolean) => void;
  }
  

const SearchComponent: React.FC<SearchComponentProps> = ({ currentDrive, onSearchActive ,onFiltersChange}) => {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const { results, loading, error, search } = useSearch();
  const history = useHistory();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Remove the query.trim() check since query is optional
    search({
      query: query.trim() || undefined, // Send undefined if empty
      driveName: currentDrive,
      ...activeFilters
    });
    onSearchActive?.(true);
  };

  const handleClear = () => {
    setQuery('');
    setActiveFilters({});
    onFiltersChange?.(false);
    search({});
    onSearchActive?.(false);
  };

  const handleApplyFilters = (filters: {
    type: string;
    year: string;
    isFolder: boolean | null;
    minSize: string;
    maxSize: string;
  }) => {
    const newFilters: Record<string, string> = {};
    
    if (filters.type) newFilters.type = filters.type;
    if (filters.year) newFilters.year = filters.year;
    if (filters.isFolder !== null) newFilters.isFolder = filters.isFolder.toString();
    if (filters.minSize) newFilters.minSize = filters.minSize;
    if (filters.maxSize) newFilters.maxSize = filters.maxSize;

    setActiveFilters(newFilters);

    const hasFilters = Object.keys(newFilters).length > 0;
    setActiveFilters(newFilters);
    onFiltersChange?.(hasFilters);
    
    // Always search when filters are applied, even without query
    search({
      query: query.trim() || undefined,
      driveName: currentDrive,
      ...newFilters
    });
  };

  const handleResetFilters = () => {
    setActiveFilters({});
    onFiltersChange?.(false);
    search({
      query: query.trim() || undefined,
      driveName: currentDrive
    });
  };



  const handleFileClick = (file: any) => {
    if (file.isFolder) {
      history.push(`/files/${currentDrive}?folderPath=${encodeURIComponent(file.name)}`);
    } else {
      window.open(file.webViewLink || file.webContentLink, '_blank');
    }
  };

  return (
    <div className="search-component">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder="Search files and folders (optional)..."
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
        {(query || Object.keys(activeFilters).length > 0) && (
          <button 
            type="button" 
            className="clear-button"
            onClick={handleClear}
          >
            Clear All
          </button>
        )}
      </form>

      <AdvancedFilters 
        onApplyFilters={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {Object.keys(activeFilters).length > 0 && (
        <div className="active-filters">
          <strong>Active Filters:</strong>
          {Object.entries(activeFilters).map(([key, value]) => (
            <span key={key} className="filter-tag">
              {key}: {value}
            </span>
          ))}
        </div>
      )}

      {error && <div className="search-error">{error}</div>}

      {results.files.length > 0 ? (
        <div className="search-results">
          <h3>Search Results ({results.count})</h3>
          <FileandFolderList files={results.files} onItemClick={handleFileClick} />
        </div>
      ) : (query || Object.keys(activeFilters).length > 0) && !loading && (
        <div className="no-results">No matching files found</div>
      )}
    </div>
  );
};

export default SearchComponent;