export interface Drive {
    _id: string;
    driveName: string;
    isDefault: boolean;
    folderId?: string;  // Add if your drive has specific folders
  }
  
  export interface DriveResponse<T> {
    data?: T;
    error?: string;
    details?: string;
  }