// File: drive_school_app\src\pages\FavoritesPage.tsx
import React from 'react';
import { Item } from '../types/item';
import FileandFolderList from './FileandFolderList';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = React.useState<Item[]>([]);

  React.useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  }, []);

  const handleFileClick = (file: Item) => {
    if (file.webViewLink || file.webContentLink) {
      window.open(file.webViewLink || file.webContentLink, '_blank');
    }
  };

  return (
    <div>
      <h1>Favorite Files</h1>
      {favorites.length > 0 ? (
        <FileandFolderList 
          files={favorites} 
          onItemClick={handleFileClick} 
        />
      ) : (
        <div>No favorite files yet</div>
      )}
    </div>
  );
};

export default FavoritesPage;