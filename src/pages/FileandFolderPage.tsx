import React, { useState, useEffect } from 'react';
import { useFilesandFolder } from '../hooks/useFilesandFolder';
import FileandFolderList from './FileandFolderList';
import { useHistory, useParams } from 'react-router-dom';
import { Item } from '../types/item';
import FileViewerModal from '../components/FileViewerModal/FileViewerModal';
import SearchComponent from '../components/Search/search';
import Breadcrumbs from './BreadCrumb';
import { useRecentItems } from '../hooks/useRecentItems';

const FileandfolderPage: React.FC = () => {
  const { driveName = 'default', folderPath } = useParams<{ driveName?: string; folderPath?: string }>();
  const { currentPath, files, loading, error, navigateToFolder } = useFilesandFolder();
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState<Item | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const { addRecentItem } = useRecentItems();



  // Add debug logs
  useEffect(() => {
    console.log('Files loading state:', loading);
    console.log('Current files:', files);
    console.log('Error state:', error);
  }, [loading, files, error]);

  const handleFileClick = async(file: Item) => {
    if (file.isFolder) {
      const newPath = navigateToFolder(file.name);
      history.push(newPath);
      window.location.reload();
    } else {
        setSelectedFile(file);
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

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (loading) return (
    <div>
      <p>Loading files...</p>
      <p>Current path: {currentPath}</p>
      <button onClick={handleRetry}>Retry</button>
    </div>
  );

  if (error) return (
    <div>
      <p>Error loading files: {error}</p>
      <button onClick={handleRetry}>Retry</button>
    </div>
  );


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
  
      
  <FileViewerModal 
  file={selectedFile} 
  onClose={() => setSelectedFile(null)}
  addRecentItem={addRecentItem}
  driveName={driveName}
/>    </div>
  );
};
export default FileandfolderPage;