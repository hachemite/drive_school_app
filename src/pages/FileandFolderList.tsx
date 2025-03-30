// File: drive-course-app\src\pages\FileandFolderList.tsx
import React from 'react';
import { Item } from '../types/item'; // Changed from FileItem to Item

interface FileandfolderListProps {
  files: Item[]; // Changed from FileItem[] to Item[]
  onItemClick: (file: Item) => void; // Changed from FileItem to Item
}

const FileandFolderList: React.FC<FileandfolderListProps> = ({ files, onItemClick }) => {
  return (
    <div className="file-list">
      {files.map((file) => (
        <div 
          key={file.id} 
          className={`file-item ${file.isFolder ? 'folder' : 'file'}`}
          onClick={() => onItemClick(file)}
          style={{ cursor: 'pointer', padding: '10px', margin: '5px', border: '1px solid #ddd' }}
        >
      {file.isFolder ? '📁' : '📄'} {file.name}
      {!file.isFolder && file.size && (
            <span style={{ fontSize: '0.8em', color: '#666', marginLeft: '10px' }}>
              {(parseInt(file.size) / 1024 / 1024).toFixed(2)} MB
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileandFolderList;