// File: drive_school_app/src/services/favorites.service.ts
import { Item } from '../types/item';

interface FavoriteItem extends Item {
  driveName: string;
  addedAt: string;
}

class FavoritesService {
  private readonly STORAGE_KEY = 'favorite_items';

  /**
   * Add an item to favorites
   */
  addFavorite(item: Item, driveName: string): void {
    const favorites = this.getFavorites();
    
    // Check if item already exists in favorites
    const exists = favorites.some(fav => fav.id === item.id);
    
    if (!exists) {
      const favoriteItem: FavoriteItem = {
        ...item,
        driveName,
        addedAt: new Date().toISOString()
      };
      
      favorites.push(favoriteItem);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    }
  }

  /**
   * Remove an item from favorites
   */
  removeFavorite(itemId: string): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(item => item.id !== itemId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
  }

  /**
   * Get all favorite items
   */
  getFavorites(): FavoriteItem[] {
    const favoritesJson = localStorage.getItem(this.STORAGE_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }

  /**
   * Check if an item is in favorites
   */
  isFavorite(itemId: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(item => item.id === itemId);
  }

  /**
   * Toggle favorite status - add if not favorite, remove if already favorite
   */
  toggleFavorite(item: Item, driveName: string): boolean {
    if (this.isFavorite(item.id)) {
      this.removeFavorite(item.id);
      return false;
    } else {
      this.addFavorite(item, driveName);
      return true;
    }
  }
}

export const favoritesService = new FavoritesService();