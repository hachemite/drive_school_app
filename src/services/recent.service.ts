// File: drive_school_app\src\services\recent.service.ts
import { Item } from '../types/item';

const RECENT_ITEMS_KEY = 'recent_items';
const MAX_RECENT_ITEMS = 10;

export interface RecentItem extends Item {
  timestamp: number;
  driveName: string;
}

const getRecentItems = (): RecentItem[] => {
  try {
    const storedItems = localStorage.getItem(RECENT_ITEMS_KEY);
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error('Error retrieving recent items:', error);
    return [];
  }
};

const addRecentItem = (item: Item, driveName: string): void => {
  try {
    // Don't add folders to recent items
    if (item.isFolder) {
      return;
    }
    
    const recentItems = getRecentItems();
    
    // Check if item already exists
    const existingItemIndex = recentItems.findIndex(
      (recent) => recent.id === item.id && recent.driveName === driveName
    );
    
    const newRecentItem: RecentItem = {
      ...item,
      timestamp: Date.now(),
      driveName
    };
    
    if (existingItemIndex !== -1) {
      // Remove existing item so it can be added to the top
      recentItems.splice(existingItemIndex, 1);
    }
    
    // Add new item to the beginning
    recentItems.unshift(newRecentItem);
    
    // Limit the number of items
    const limitedItems = recentItems.slice(0, MAX_RECENT_ITEMS);
    
    // Save to localStorage
    localStorage.setItem(RECENT_ITEMS_KEY, JSON.stringify(limitedItems));
  } catch (error) {
    console.error('Error saving recent item:', error);
  }
};

const clearRecentItems = (): void => {
  localStorage.removeItem(RECENT_ITEMS_KEY);
};

export const recentService = {
  getRecentItems,
  addRecentItem,
  clearRecentItems
};