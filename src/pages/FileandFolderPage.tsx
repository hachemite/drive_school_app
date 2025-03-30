// File: drive-course-app/src/pages/FileandFolderPage.tsx
import React, { useState } from 'react';
import { useFilesandFolder } from '../hooks/useFilesandFolder';
import FileandFolderList from './FileandFolderList';
import { useHistory } from 'react-router-dom';
import Breadcrumbs from './BreadCrumb';
import { Item } from '../types/item';
import SearchComponent from '../components/Search/search';

const FileandfolderPage: React.FC = () => {
  const { currentPath, files, loading, error, navigateToFolder, driveName } = useFilesandFolder();
  const history = useHistory();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  const handleFileClick = (file: Item) => {
    if (file.isFolder) {
      const newPath = navigateToFolder(file.name);
      history.push(newPath);
    } else {
      window.open(file.webViewLink || file.webContentLink, '_blank');
    }
  };

  const handleSearchActive = (isActive: boolean) => {
    setIsSearchActive(isActive);
    // Reset filter state when search is cleared
    if (!isActive) setHasActiveFilters(false);
  };

  const handleFiltersChange = (hasFilters: boolean) => {
    setHasActiveFilters(hasFilters);
    setIsSearchActive(hasFilters);
  };

  if (loading) return <div>Loading files...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="file-explorer">
      <h1>Drive: {driveName}</h1>
      <Breadcrumbs currentPath={currentPath} driveName={driveName!} />
      <SearchComponent 
        currentDrive={driveName} 
        onSearchActive={handleSearchActive}
        onFiltersChange={handleFiltersChange}
      />
      
      {/* Show regular files only when no search or filters are active */}
      {!isSearchActive && !hasActiveFilters && files && files.length > 0 ? (
        <FileandFolderList 
          files={files} 
          onItemClick={handleFileClick} 
        />
      ) : !isSearchActive && !hasActiveFilters ? (
        <div>No files or folders found</div>
      ) : null}
    </div>
  );
};

export default FileandfolderPage;