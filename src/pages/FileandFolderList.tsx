// File: drive_school_app\src\pages\FileandFolderList.tsx
import React, { useState, useEffect } from 'react';
import { Item } from '../types/item';

interface FileandfolderListProps {
  files: Item[];
  onItemClick: (file: Item) => void;
}

const FileandFolderList: React.FC<FileandfolderListProps> = ({ files, onItemClick }) => {
  // State to track favorites for immediate UI feedback
  const [favorites, setFavorites] = useState<Item[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  // Function to handle adding/removing favorites
  const toggleFavorite = (file: Item) => {
    const updatedFavorites = [...favorites];
    const existingIndex = updatedFavorites.findIndex(fav => fav.id === file.id);

    if (existingIndex >= 0) {
      // Remove from favorites
      updatedFavorites.splice(existingIndex, 1);
    } else {
      // Add to favorites
      updatedFavorites.push(file);
    }

    // Update both state and localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Check if a file is favorite
  const isFavorite = (fileId: string) => {
    return favorites.some(fav => fav.id === fileId);
  };

  return (
    <div className="file-list">
      {files.map((file) => (
        <div 
          key={file.id} 
          className={`file-item ${file.isFolder ? 'folder' : 'file'}`}
          style={{ 
            cursor: 'pointer', 
            padding: '10px', 
            margin: '5px', 
            border: '1px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div onClick={() => onItemClick(file)} style={{ flexGrow: 1 }}>
            {file.isFolder ? '📁' : '📄'} {file.name}
            {!file.isFolder && file.size && (
              <span style={{ fontSize: '0.8em', color: '#666', marginLeft: '10px' }}>
                {(parseInt(file.size) / 1024 / 1024).toFixed(2)} MB
              </span>
            )}
          </div>
          {!file.isFolder && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(file);
              }}
              style={{
                marginLeft: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isFavorite(file.id) ? 'gold' : 'gray',
                fontSize: '1.2em',
                transition: 'transform 0.2s, color 0.2s'
              }}
              onMouseDown={(e) => {
                // Add a small click effect
                e.currentTarget.style.transform = 'scale(0.9)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              title={isFavorite(file.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite(file.id) ? '★' : '☆'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileandFolderList;