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

export const driveService = {
  fetchDrives,
  fetchFileAndFolder,
};