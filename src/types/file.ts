// src/types/file.ts
export interface FileItem {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  size?: string;         // Added from API response
  modifiedTime?: string; // Added from API response
  isFolder: boolean;     // Derived from mimeType but explicitly added for convenience
  parentPath?: string;   // Added from API response
}

export interface FilesResponse<T> {
  path?: string;         // Added from API response
  currentFolderId?: string; // Added from API response
  files?: T;            // Changed from 'data' to 'files' to match API response
  error?: string;
  details?: string;
}

// Optional: You might want to add a type for the full files API response
export interface FilesApiResponse {
  path: string;
  currentFolderId: string;
  files: FileItem[];
  error?: string;
  details?: string;
}