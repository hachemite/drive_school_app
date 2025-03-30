// File: drive_school_app\src\hooks\useRecentItems.ts
import { useState, useEffect } from 'react';
import { recentService, RecentItem } from '../services/recent.service';

export const useRecentItems = () => {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load recent items
  useEffect(() => {
    const loadRecentItems = () => {
      setLoading(true);
      const items = recentService.getRecentItems();
      setRecentItems(items);
      setLoading(false);
    };

    // Load initially
    loadRecentItems();

    // Set up a listener for storage events (in case multiple tabs are open)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'recent_items') {
        loadRecentItems();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Add a recent item
  const addRecentItem = (item: any, driveName: string) => {
    recentService.addRecentItem(item, driveName);
    // Update the local state with fresh data from localStorage
    setRecentItems(recentService.getRecentItems());
  };

  // Clear all recent items
  const clearRecentItems = () => {
    recentService.clearRecentItems();
    setRecentItems([]);
  };

  return {
    recentItems,
    loading,
    addRecentItem,
    clearRecentItems
  };
};