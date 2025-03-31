// File: drive_school_app\src\pages\FileandFolderList.tsx
import React, { useState, useEffect } from 'react';
import { Item } from '../types/item';

interface FileandfolderListProps {
  files: Item[];
  onItemClick: (file: Item) => void;
}

const FileandFolderList: React.FC<FileandfolderListProps> = ({ files, onItemClick }) => {
  const [favorites, setFavorites] = useState<Item[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  // Toggle favorite status
  const toggleFavorite = (file: Item) => {
    const updatedFavorites = [...favorites];
    const existingIndex = updatedFavorites.findIndex(fav => fav.id === file.id);

    if (existingIndex >= 0) {
      updatedFavorites.splice(existingIndex, 1);
    } else {
      updatedFavorites.push(file);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Check if a file is favorite
  const isFavorite = (fileId: string) => {
    return favorites.some(fav => fav.id === fileId);
  };

  // Handle file download
  const handleDownload = (file: Item) => {
    if (file.webContentLink) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = file.webContentLink;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.warn('No download link available for this file');
      // You could add a toast notification here
    }
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
            <div style={{ display: 'flex', gap: '8px' }}>
              {/* Download Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(file);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#4a90e2',
                  fontSize: '1.2em',
                  padding: '4px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                title="Download file"
              >
                ⬇️
              </button>
              
              {/* Favorite Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(file);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isFavorite(file.id) ? 'gold' : 'gray',
                  fontSize: '1.2em',
                  padding: '4px',
                  borderRadius: '4px',
                  transition: 'color 0.2s, background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                title={isFavorite(file.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite(file.id) ? '★' : '☆'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileandFolderList;