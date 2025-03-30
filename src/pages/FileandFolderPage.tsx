// File: drive-course-app\src\pages\FileandFolderPage.tsx
import React from 'react';
import { useFilesandFolder } from '../hooks/useFilesandFolder';
import FileandFolderList from './FileandFolderList';
import { useHistory } from 'react-router-dom';
import Breadcrumbs from './BreadCrumb';
import { Item } from '../types/item'; // Updated import

const FileandfolderPage: React.FC = () => {
  const { currentPath, files, loading, error, navigateToFolder, driveName } = useFilesandFolder();
  const history = useHistory();

  const handleFileClick = (file: Item) => { // Updated type
    if (file.isFolder) {
      // Navigate to the folder using the navigateToFolder helper
      const newPath = navigateToFolder(file.name);
      history.push(newPath);
    } else {
      // Handle file preview/download logic here
      window.open(file.webViewLink || file.webContentLink, '_blank');
    }
  };

  if (loading) return <div>Loading files...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="file-explorer">
      <h1>Drive: {driveName}</h1>
      <Breadcrumbs currentPath={currentPath} driveName={driveName!} />
      {files && files.length > 0 ? (
        <FileandFolderList 
          files={files} 
          onItemClick={handleFileClick} 
        />
      ) : (
        <div>No files or folders found</div>
      )}
    </div>
  );
};

export default FileandfolderPage;