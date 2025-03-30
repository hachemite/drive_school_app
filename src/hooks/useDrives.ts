import { useEffect, useState } from 'react';
import { Drive, DriveResponse } from '../types/drive';
import { fetchDrives } from '../services/drive.service';

export const useDrives = () => {
  const [drives, setDrives] = useState<Drive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDrives = async () => {
      try {
        setLoading(true);
        const response = await fetchDrives();
        
        if (response.data) {
          setDrives(response.data);
        } else if (response.error) {
          setError(response.error);
        }
      } catch (err) {
        setError('Failed to load drives');
      } finally {
        setLoading(false);
      }
    };


    loadDrives();
    
  }, []);

  return { drives, loading, error };
};