// File: drive_school_app/src/pages/FileandFolderList.tsx
import React, { useState, useEffect } from 'react';
import { Item } from '../types/item';
import { Folder, File, Star, Download, Grid, List, MoreVertical, Image, Music, Video, FileText, FileArchive } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

interface FileandFolderListProps {
  files: Item[];
  onItemClick: (file: Item) => void;
}

const FileandFolderList: React.FC<FileandFolderListProps> = ({ files, onItemClick }) => {
  const [favorites, setFavorites] = useState<Item[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // File type styling configuration
  const fileTypeStyles = {
    folder: {
      icon: Folder,
      bgColor: 'bg-[#ADB2D4]',
      iconColor: 'text-[#EEF1DA]'
    },
    image: {
      icon: Image,
      bgColor: 'bg-[#FAD7A1]',
      iconColor: 'text-[#F6B93B]'
    },
    audio: {
      icon: Music,
      bgColor: 'bg-[#F9E4B7]',
      iconColor: 'text-[#F6B93B]'
    },
    video: {
      icon: Video,
      bgColor: 'bg-[#F1A7A1]',
      iconColor: 'text-[#EEF1DA]'
    },
    document: {
      icon: FileText,
      bgColor: 'bg-[#C7D9DD]',
      iconColor: 'text-[#5a5f7c]'
    },
    archive: {
      icon: FileArchive,
      bgColor: 'bg-[#F1C6D4]',
      iconColor: 'text-[#ADB2D4]'
    },
    default: {
      icon: File,
      bgColor: 'bg-[#D5E5D5]',
      iconColor: 'text-[#5a5f7c]'
    }
  };

  const getFileType = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (!extension) return 'default';
    
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const audioTypes = ['mp3', 'wav', 'ogg', 'm4a'];
    const videoTypes = ['mp4', 'mov', 'avi', 'mkv'];
    const documentTypes = ['pdf', 'doc', 'docx', 'txt', 'rtf'];
    const archiveTypes = ['zip', 'rar', '7z', 'tar', 'gz'];
    
    if (imageTypes.includes(extension)) return 'image';
    if (audioTypes.includes(extension)) return 'audio';
    if (videoTypes.includes(extension)) return 'video';
    if (documentTypes.includes(extension)) return 'document';
    if (archiveTypes.includes(extension)) return 'archive';
    
    return 'default';
  };

  // Default to grid view on mobile
  useEffect(() => {
    if (isMobile) {
      setViewMode('grid');
    }
  }, [isMobile]);

  // Load favorites
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (file: Item) => {
    const updatedFavorites = favorites.some(fav => fav.id === file.id)
      ? favorites.filter(fav => fav.id !== file.id)
      : [...favorites, file];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (fileId: string) => favorites.some(fav => fav.id === fileId);

  const handleDownload = (file: Item) => {
    if (file.webContentLink) {
      const link = document.createElement('a');
      link.href = file.webContentLink;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Mobile Grid View
  const MobileGridView = () => (
    <div className="grid grid-cols-2 gap-3 p-3">
      {files.map((file) => {
        const fileType = file.isFolder ? 'folder' : getFileType(file.name);
        const { icon: Icon, bgColor, iconColor } = fileTypeStyles[fileType] || fileTypeStyles.default;
        
        return (
          <div
            key={file.id}
            onClick={() => onItemClick(file)}
            className="bg-[#EEF1DA] rounded-lg p-3 flex flex-col items-center cursor-pointer hover:bg-[#D5E5D5] transition-colors duration-200 relative"
          >
            <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mb-2`}>
              <Icon size={24} className={iconColor} />
            </div>
            <p className="text-[#5a5f7c] text-xs font-medium text-center truncate w-full">
              {file.name}
            </p>
            {!file.isFolder && (
              <div className="absolute top-1 right-1">
                <MoreVertical size={16} className="text-[#ADB2D4]" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // Desktop Grid View
  const DesktopGridView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {files.map((file) => {
        const fileType = file.isFolder ? 'folder' : getFileType(file.name);
        const { icon: Icon, bgColor, iconColor } = fileTypeStyles[fileType] || fileTypeStyles.default;
        
        return (
          <div
            key={file.id}
            onClick={() => onItemClick(file)}
            className="bg-[#EEF1DA] rounded-xl p-4 flex flex-col items-center cursor-pointer hover:bg-[#D5E5D5] transition-colors duration-200 relative"
          >
            <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mb-3`}>
              <Icon size={32} className={iconColor} />
            </div>
            <p className="text-[#5a5f7c] text-sm font-medium text-center truncate w-full">
              {file.name}
            </p>
            {!file.isFolder && file.size && (
              <span className="text-xs text-[#ADB2D4] mt-1">
                {(parseInt(file.size) / 1024 / 1024).toFixed(2)} MB
              </span>
            )}
            <div className="absolute top-2 right-2 flex gap-1">
              {!file.isFolder && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(file);
                    }}
                    className="p-1 text-[#ADB2D4] hover:text-[#6b708a] rounded-full hover:bg-[#C7D9DD] transition-colors"
                    title="Download"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(file);
                    }}
                    className="p-1 rounded-full hover:bg-[#C7D9DD] transition-colors"
                    title={isFavorite(file.id) ? 'Remove favorite' : 'Add favorite'}
                  >
                    <Star
                      size={16}
                      fill={isFavorite(file.id) ? 'gold' : 'transparent'}
                      color={isFavorite(file.id) ? 'gold' : '#ADB2D4'}
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  // List View
  const ListView = () => (
    <div className="p-2 sm:p-4 space-y-2">
      {files.map((file) => {
        const fileType = file.isFolder ? 'folder' : getFileType(file.name);
        const { icon: Icon, bgColor, iconColor } = fileTypeStyles[fileType] || fileTypeStyles.default;
        
        return (
          <div
            key={file.id}
            onClick={() => onItemClick(file)}
            className="bg-[#EEF1DA] rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-[#D5E5D5] transition-colors duration-200"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                <Icon size={20} className={iconColor} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[#5a5f7c] font-medium truncate">{file.name}</p>
                {!file.isFolder && file.size && (
                  <p className="text-xs text-[#ADB2D4] truncate">
                    {(parseInt(file.size) / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </div>
            </div>
            {!file.isFolder && (
              <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(file);
                  }}
                  className="p-1 text-[#ADB2D4] hover:text-[#6b708a] rounded-full hover:bg-[#C7D9DD] transition-colors"
                  title="Download"
                >
                  <Download size={isMobile ? 16 : 18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(file);
                  }}
                  className="p-1 rounded-full hover:bg-[#C7D9DD] transition-colors"
                  title={isFavorite(file.id) ? 'Remove favorite' : 'Add favorite'}
                >
                  <Star
                    size={isMobile ? 16 : 18}
                    fill={isFavorite(file.id) ? 'gold' : 'transparent'}
                    color={isFavorite(file.id) ? 'gold' : '#ADB2D4'}
                  />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={`${isMobile ? 'ml-2 mr-2' : 'ml-20 mr-4'} my-4`}>
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#5a5f7c]">My Drives</h2>
        {!isMobile && (
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#D5E5D5] text-[#5a5f7c]' : 'text-[#ADB2D4] hover:bg-[#C7D9DD]'}`}
              title="Grid view"
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#D5E5D5] text-[#5a5f7c]' : 'text-[#ADB2D4] hover:bg-[#C7D9DD]'}`}
              title="List view"
            >
              <List size={20} />
            </button>
          </div>
        )}
      </div>
      
      {files.length === 0 ? (
        <div className="bg-[#EEF1DA] rounded-xl p-6 sm:p-8 text-center text-[#ADB2D4]">
          No files or folders found
        </div>
      ) : isMobile ? (
        <MobileGridView />
      ) : viewMode === 'grid' ? (
        <DesktopGridView />
      ) : (
        <ListView />
      )}
    </div>
  );
};

export default FileandFolderList;