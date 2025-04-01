// drive_school_app\src\types\item.ts
export interface Item {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  size?: string;
  modifiedTime?: string;
  isFolder: boolean;
  parentPath: string;
  stats?: {  // Add optional stats
    views?: number;
    downloads?: number;
    previews?: number;
    lastAccessed?: string;
    uniqueUsers?: number;
  };
}
  
  export interface FetchItemsResult {
    items: Item[];
    currentPath: string;
    currentFolderId: string;
    isLoading: boolean;
    error: string | null;
    refresh: () => void;
  }

  export interface ItemsResponse {
    success: boolean;
    data?: {
      items: Item[];
      currentPath: string;
      currentFolderId: string;
    };
    error?: string;
  }