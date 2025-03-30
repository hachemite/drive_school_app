// File: drive-course-app/src/services/search.service.ts
import { Item } from '../types/item';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export interface SearchResponse {
  success: boolean;
  count: number;
  files: Item[];
  error?: string;
  details?: string;
}

export interface SearchParams {
  query?: string;
  driveName?: string;
  type?: string;
  year?: string;
  isFolder?: boolean;
  minSize?: string;
  maxSize?: string;
}

export const searchFiles = async (params: SearchParams): Promise<SearchResponse> => {
  try {
    const searchParams = new URLSearchParams();
    
    // Only append query if it exists
    if (params.query) {
      searchParams.append('q', params.query);
    }
    
    if (params.driveName) searchParams.append('driveName', params.driveName);
    if (params.type) searchParams.append('type', params.type);
    if (params.year) searchParams.append('year', params.year);
    if (params.isFolder !== undefined) searchParams.append('isFolder', params.isFolder.toString());
    if (params.minSize) searchParams.append('minSize', params.minSize);
    if (params.maxSize) searchParams.append('maxSize', params.maxSize);

    const response = await fetch(`${API_BASE_URL}/search?${searchParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Search Error:', error);
    return {
      success: false,
      count: 0,
      files: [],
      error: 'Search failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const searchService = {
  searchFiles,
};