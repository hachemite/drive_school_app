// File: drive-course-app/src/components/SearchComponent/SearchComponent.tsx
import React, { useState, useEffect } from 'react';
import { useSearch } from '../../hooks/useSearch';
import FileandFolderList from '../../pages/FileandFolderList';
import { useHistory } from 'react-router-dom';
import AdvancedFilters from '../AdvanceFilters/AdvanceFilters';
import { Search, X, Filter, Loader2 } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

interface SearchComponentProps {
  currentDrive?: string;
  onSearchActive?: (isActive: boolean) => void;
  onFiltersChange?: (hasFilters: boolean) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ 
  currentDrive, 
  onSearchActive, 
  onFiltersChange 
}) => {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { results, loading, error, search } = useSearch();
  const history = useHistory();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Color palette
  const colors = {
    primary: '#F6B93B',
    secondary: '#ADB2D4',
    accent: '#F1A7A1',
    background: '#EEF1DA',
    card: '#D5E5D5',
    text: '#5a5f7c',
    lightAccent: '#F1C6D4'
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    search({
      query: query.trim() || undefined,
      driveName: currentDrive,
      ...activeFilters
    });
    onSearchActive?.(true);
  };

  const handleClear = () => {
    setQuery('');
    setActiveFilters({});
    setShowFilters(false);
    setHasSearched(false);
    onFiltersChange?.(false);
    onSearchActive?.(false);
    // Don't perform any search when clearing
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
    setShowFilters(false);
    setHasSearched(true);
    const hasFilters = Object.keys(newFilters).length > 0;
    onFiltersChange?.(hasFilters);
    
    search({
      query: query.trim() || undefined,
      driveName: currentDrive,
      ...newFilters
    });
  };

  const handleResetFilters = () => {
    setActiveFilters({});
    setHasSearched(false);
    onFiltersChange?.(false);
    // Don't perform any search when resetting filters
  };

  const handleFileClick = (file: any) => {
    if (file.isFolder) {
      history.push(`/files/${currentDrive}?folderPath=${encodeURIComponent(file.name)}`);
    } else {
      window.open(file.webViewLink || file.webContentLink, '_blank');
    }
  };

  // Only show results if we've actually performed a search
  const shouldShowResults = hasSearched && (query || Object.keys(activeFilters).length > 0);

  return (
    <div className={`rounded-2xl p-4 ${shouldShowResults ? 'bg-[#F9E4B7]' : 'bg-transparent'} transition-colors duration-200`}>
      {/* Search Bar */}
      <form 
        onSubmit={handleSearch} 
        className="flex flex-col sm:flex-row gap-3 mb-4"
      >
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#ADB2D4]" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files and folders..."
            className={`pl-10 pr-4 py-3 w-full rounded-lg border border-[#C7D9DD] focus:outline-none focus:ring-2 focus:ring-[#F6B93B] focus:border-transparent bg-white`}
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg ${loading ? 'bg-[#D5E5D5]' : 'bg-[#F6B93B] hover:bg-[#FAD7A1]'} text-white transition-colors`}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {!isMobile && 'Searching'}
              </>
            ) : (
              <>
                <Search size={18} />
                {!isMobile && 'Search'}
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg ${Object.keys(activeFilters).length > 0 ? 'bg-[#F1A7A1]' : 'bg-[#ADB2D4] hover:bg-[#C7D9DD]'} text-white transition-colors`}
          >
            <Filter size={18} />
            {!isMobile && 'Filters'}
          </button>
          
          {(query || Object.keys(activeFilters).length > 0) && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#F1C6D4] hover:bg-[#F6B93B] text-[#5a5f7c] transition-colors"
            >
              <X size={18} />
              {!isMobile && 'Clear'}
            </button>
          )}
        </div>
      </form>

      {/* Active Filters */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(activeFilters).map(([key, value]) => (
            <div 
              key={key}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1C6D4] text-[#5a5f7c] text-sm"
            >
              <span className="font-medium">{key}:</span>
              <span>{value}</span>
              <button 
                onClick={() => {
                  const newFilters = {...activeFilters};
                  delete newFilters[key];
                  setActiveFilters(newFilters);
                  onFiltersChange?.(Object.keys(newFilters).length > 0);
                  if (query || Object.keys(newFilters).length > 0) {
                    search({
                      query: query.trim() || undefined,
                      driveName: currentDrive,
                      ...newFilters
                    });
                  } else {
                    setHasSearched(false);
                  }
                }}
                className="text-[#F1A7A1] hover:text-[#F6B93B]"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mb-4 p-4 rounded-lg bg-[#D5E5D5]">
          <AdvancedFilters 
            onApplyFilters={handleApplyFilters}
            onReset={handleResetFilters}
          />
        </div>
      )}

      {/* Search Results */}
      {error && (
        <div className="p-3 rounded-lg bg-[#F1A7A1] text-white mb-4">
          {error}
        </div>
      )}

      {shouldShowResults && results.files.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-[#5a5f7c] mb-3">
            Search Results ({results.count})
          </h3>
          <FileandFolderList files={results.files} onItemClick={handleFileClick} />
        </div>
      ) : shouldShowResults && !loading && (
        <div className="p-6 text-center text-[#5a5f7c] bg-[#EEF1DA] rounded-lg">
          No matching files found
        </div>
      )}
    </div>
  );
};

export default SearchComponent;