// File: drive-course-app\src\hooks\useFilesandFolder.ts
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { driveService } from '../services/drive.service';
import { Item } from '../types/item'; // Changed from FileItem to Item

export const useFilesandFolder = () => {
  const { driveName } = useParams<{ driveName: string }>();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState('');
  const [files, setFiles] = useState<Item[]>([]); // Changed from FileItem[] to Item[]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const folderPath = queryParams.get('folderPath') || '';
    setCurrentPath(folderPath);

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await driveService.fetchFileAndFolder(driveName!, folderPath);
        
        if (response.error) {
          throw new Error(response.error);
        }
        
        // Handle different response structures
        if (response.items) {
          setFiles(response.items);
        } else if (response.data && response.data.items) {
          setFiles(response.data.items);
        } else if (response.files) {
          // Convert FileItem[] to Item[] if needed
          setFiles(response.files.map((file: any) => ({
            ...file,
            parentPath: file.parentPath || ''
          })));
        } else {
          setFiles([]);
          console.warn('Unexpected response structure:', response);
        }
      } catch (err) {
        console.error('Error in useFilesandFolder:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch files');
      } finally {
        setLoading(false);
      }
    };

    if (driveName) {
      fetchData();
    }
  }, [driveName, location.search]);

  const navigateToFolder = (folderName: string) => {
    const newPath = currentPath ? `${currentPath}/${folderName}` : folderName;
    return `/drive/${driveName}?folderPath=${encodeURIComponent(newPath)}`;
  };

  return {
    currentPath,
    files,
    loading,
    error,
    navigateToFolder,
    driveName
  };
};