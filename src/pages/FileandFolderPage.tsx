import React, { useState } from 'react';
import { useFilesandFolder } from '../hooks/useFilesandFolder';
import FileandFolderList from './FileandFolderList';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Item } from '../types/item';
import FileViewerModal from '../components/FileViewerModal/FileViewerModal';
import SearchComponent from '../components/Search/search';
import Breadcrumbs from './BreadCrumb';
import { useRecentItems } from '../hooks/useRecentItems';
import { Loader2, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import BackButton from '../components/Button/BackButton';

const FileandfolderPage: React.FC = () => {
  const { driveName = 'default', folderPath } = useParams<{ driveName?: string; folderPath?: string }>();
  const { currentPath, files, loading, error, navigateToFolder } = useFilesandFolder();
  const history = useHistory();
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState<Item | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const { addRecentItem } = useRecentItems();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleFileClick = async (file: Item) => {
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
    if (!isActive) setHasActiveFilters(false);
  };

  const handleFiltersChange = (hasFilters: boolean) => {
    setHasActiveFilters(hasFilters);
    setIsSearchActive(hasFilters);
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  if (loading) return (
    <div className={`flex flex-col items-center justify-center min-h-[60vh] ${isMobile ? '' : 'pl-16'}`}>
      <div className="flex flex-col items-center rounded-xl p-8 max-w-md w-full bg-[#F6B93B] shadow-lg">
        <Loader2 className="animate-spin h-12 w-12 text-[#EEF1DA] mb-4" />
        <p className="font-medium mb-2 text-white">Loading files...</p>
        <p className="text-sm text-center mb-4 text-[#F9E4B7]">Current path: {currentPath}</p>
        <button 
          onClick={handleRetry}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#F6B93B] font-medium hover:bg-[#EEF1DA] transition-colors"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pl-16">
      <div className="flex flex-col items-center rounded-xl p-8 max-w-md w-full bg-[#F1A7A1] shadow-lg">
        <AlertCircle className="h-12 w-12 text-[#EEF1DA] mb-4" />
        <p className="font-medium mb-2 text-white">Error loading files</p>
        <p className="text-sm text-center mb-4 text-[#F9E4B7]">{error}</p>
        <button 
          onClick={handleRetry}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#F1A7A1] font-medium hover:bg-[#EEF1DA] transition-colors"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    </div>
  );

  return (

    <div className={`${isMobile ? '' : 'pl-20'} pr-4 py-4 min-h-[calc(100vh-64px)]`}>
      {/* Header Section */}
      <div className="rounded-xl p-4 mb-4 bg-[#F6B93B] shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold truncate text-white">
              Drive: {driveName}
            </h1>
            <Breadcrumbs currentPath={currentPath} driveName={driveName!} />
          </div>
          <div className="w-full sm:w-auto">
            <SearchComponent 
              currentDrive={driveName} 
              onSearchActive={handleSearchActive}
              onFiltersChange={handleFiltersChange}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="rounded-xl p-4 bg-[#FAD7A1] shadow-lg min-h-[60vh]">
        {!isSearchActive && !hasActiveFilters && files && files.length > 0 ? (
          <FileandFolderList 
            files={files} 
            onItemClick={handleFileClick} 
          />
        ) : !isSearchActive && !hasActiveFilters ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full p-4 mb-4 bg-[#F6B93B]">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <p className="font-medium text-[#5a5f7c]">No files or folders found</p>
            <p className="text-sm text-[#7c7f8c]">Try uploading or creating new content</p>
          </div>
        ) : null}
      </div>

      {/* Back Button - Fixed position */}
      {location.pathname !== '/' && (
        <div className={`fixed ${isMobile ? 'bottom-20 left-1/2 transform -translate-x-1/2' : 'bottom-8 right-8'}`}>
          <BackButton onClick={handleGoBack} />
        </div>
      )}

      <FileViewerModal 
        file={selectedFile} 
        onClose={() => setSelectedFile(null)}
        addRecentItem={addRecentItem}
        driveName={driveName}
      />
    </div>
  );
};

export default FileandfolderPage;