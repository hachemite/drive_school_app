// src/types/file.ts
export interface FolderItem {
    id: string;
    name: string;
    mimeType: string;
    webViewLink?: string;
  }
  
  export interface FoldersResponse <T> {
    data?: T;
    error?: string;
    details?: string;
  }