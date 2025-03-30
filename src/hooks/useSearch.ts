// File: drive-course-app/src/hooks/useSearch.ts
import { useState } from 'react';
import { searchService, SearchResponse, SearchParams } from '../services/search.service';

export const useSearch = () => {
  const [results, setResults] = useState<SearchResponse>({
    success: false,
    count: 0,
    files: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (params: SearchParams) => {
    // Remove the query validation since it's now optional
    setLoading(true);
    setError(null);
    
    try {
      const response = await searchService.searchFiles(params);
      setResults(response);
      if (!response.success) {
        setError(response.error || 'Search failed');
      }
    } catch (err) {
      setError('An error occurred during search');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    search,  // Still returns the same structure
  };
};