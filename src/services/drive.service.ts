// File: drive-course-app\src\services\drive.service.ts
import { Drive, DriveResponse } from '../types/drive';
import { ItemsResponse, Item } from '../types/item';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const fetchDrives = async (): Promise<DriveResponse<Drive[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/drives`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error fetching drives:', error);
    return { 
      error: 'Failed to fetch drives',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const fetchFileAndFolder = async (driveName: string, folderPath?: string): Promise<ItemsResponse | any> => {
  try {
    // Ensure we're using the correct API endpoint format
    const endpoint = folderPath 
      ? `${API_BASE_URL}/files/${driveName}?folderPath=${encodeURIComponent(folderPath)}`
      : `${API_BASE_URL}/files/${driveName}`;

    console.log('Fetching files from:', endpoint); // For debugging

    const response = await fetch(endpoint);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}. ${errorText}`);
    }
    
    const data = await response.json();
    console.log('API Response Data:', data); // For debugging

    return data;
  } catch (error) {
    console.error('Error fetching files and folders:', error);
    return { 
      success: false,
      error: 'Failed to fetch files and folders',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};


// services/drive.service.ts
// drive_school_app\src\services\drive.service.ts
// File tracking service with enhanced capabilities
export const trackFileAction = async (
  fileId: string,
  actionType: 'view' | 'download' | 'preview',
  metadata: {
    sessionId: string;
    userId?: string;
    deviceType: string;
    driveName?: string;
    fileName?: string;
    referrer?: string;
  },
  retryCount: number = 2
): Promise<void> => {
  const actionMap = {
    view: 'v',
    download: 'd',
    preview: 'p'
  };
  const actionCode = actionMap[actionType];

  const trackingData = {
    fileId,
    action: actionCode,
    sessionId: metadata.sessionId,
    userId: typeof metadata.userId === 'string' ? metadata.userId : null, // Fix here
    driveName: metadata.driveName || 'default',
    fileName: metadata.fileName || 'unknown',
    deviceType: metadata.deviceType,
    referrer: metadata.referrer || 'direct',
    timestamp: new Date().toISOString()
  };

  const attemptTracking = async (attempt: number): Promise<void> => {
    try {
      // ====== ADD VALIDATION HERE ======
      const requiredFields = ['fileId', 'action', 'sessionId', 'driveName', 'fileName'];
      const missingFields = requiredFields.filter(field => !trackingData[field as keyof typeof trackingData]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required tracking fields: ${missingFields.join(', ')}`);
      }
      // ====== END OF VALIDATION ======

      console.log('Sending tracking data:', trackingData); // Optional debug log
      
      const response = await fetch(`${API_BASE_URL}/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Tracking-Attempt': attempt.toString()
        },
        body: JSON.stringify(trackingData)
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Tracking failed with status ${response.status}: ${errorBody}`);
      }
      return;
    } catch (error) {
      console.warn(`Tracking attempt ${attempt} failed:`, error);
      
      if (attempt < retryCount) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return attemptTracking(attempt + 1);
      }
      
      console.error('Tracking failed after retries:', error);
      await storeFailedTracking(trackingData);
      throw error;
    }
  };

  try {
    await attemptTracking(1);
  } catch (error) {
    // Errors are already logged
  }
};
const storeFailedTracking = async (data: any): Promise<void> => {
  try {
    const failedRequests = JSON.parse(localStorage.getItem('failedTracking') || '[]');
    failedRequests.push(data);
    localStorage.setItem('failedTracking', JSON.stringify(failedRequests));
  } catch (error) {
    console.error('Failed to store tracking data:', error);
  }
};

export const retryFailedTracking = async (): Promise<void> => {
  try {
    const failedRequests = JSON.parse(localStorage.getItem('failedTracking') || '[]');
    
    if (failedRequests.length === 0) return;
    
    console.log(`Retrying ${failedRequests.length} failed tracking requests`);
    
    const successIds: string[] = [];
    
    for (const request of failedRequests) {
      try {
        const actionMap = {
          'v': 'view',
          'd': 'download',
          'p': 'preview'
        } as const;
        
        await trackFileAction(
          request.fileId,
          actionMap[request.action as keyof typeof actionMap],
          {
            sessionId: request.sessionId,
            userId: request.userId,
            deviceType: request.deviceType,
            driveName: request.driveName,
            fileName: request.fileName,
            referrer: request.referrer
          },
          1
        );
        successIds.push(request.timestamp);
      } catch (error) {
        console.warn('Retry failed for request:', request);
      }
    }
    
    const remaining = failedRequests.filter(
      (req: { timestamp: string }) => !successIds.includes(req.timestamp)
    );
    
    localStorage.setItem('failedTracking', JSON.stringify(remaining));
  } catch (error) {
    console.error('Failed to process retries:', error);
  }
};

if (typeof window !== 'undefined') {
  setInterval(retryFailedTracking, 5 * 60 * 1000);
  
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      retryFailedTracking();
    }
  });
}export const fetchFileStats = async (fileId: string): Promise<{
  views: number;
  downloads: number;
  previews: number;
  lastAccess: string;
  uniqueSessions: number;
} | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats/${fileId}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return null;
  }
};

export const driveService = {
  fetchDrives,
  fetchFileAndFolder,
  trackFileAction
};