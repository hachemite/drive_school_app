// types/storage.ts
export interface StorageUsageResponse {
    success: boolean;
    data?: {
      used: number;
      limit: number;
    };
    error?: string;
  }

  // types/storage.ts
export interface StorageHookResult {
    used: number;
    limit: number;
    percentage: number;
    loading: boolean;
    error: string | null;
  }