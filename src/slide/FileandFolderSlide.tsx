import React, { useState, useEffect } from 'react';
import { Item } from '../types/item';
import { Folder, File, Star, Download, ChevronLeft, ChevronRight, Image, Music, Video, FileText, FileArchive } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

interface FileandFolderSlideProps {
  files: Item[];
  onItemClick: (file: Item) => void;
}

const FileandFolderSlide: React.FC<FileandFolderSlideProps> = ({ files, onItemClick }) => {
  const [favorites, setFavorites] = useState<Item[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === files.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? files.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  const visibleFiles = isMobile 
    ? [files[currentIndex]] 
    : files.slice(currentIndex, currentIndex + 3);

  if (files.length === 0) {
    return (
      <div className="bg-[#EEF1DA] rounded-xl p-6 sm:p-8 text-center text-[#ADB2D4]">
        No files or folders found
      </div>
    );
  }

  return (
    <div className={`relative ${isMobile ? 'mx-2' : 'mx-4'} my-4`}>
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#5a5f7c]">Featured Items</h2>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: isMobile 
              ? `translateX(-${currentIndex * 100}%)` 
              : `translateX(-${currentIndex * 33.33}%)`
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {files.map((file) => {
            const fileType = file.isFolder ? 'folder' : getFileType(file.name);
            const { icon: Icon, bgColor, iconColor } = fileTypeStyles[fileType] || fileTypeStyles.default;
            
            return (
              <div
                key={file.id}
                className={`flex-shrink-0 ${isMobile ? 'w-full' : 'w-1/3'} px-2`}
              >
                <div
                  onClick={() => onItemClick(file)}
                  className="bg-[#EEF1DA] rounded-xl p-4 flex flex-col items-center cursor-pointer hover:bg-[#D5E5D5] transition-colors duration-200 relative h-full"
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
              </div>
            );
          })}
        </div>
      </div>

      {files.length > 1 && (
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={prevSlide}
            className="p-2 bg-[#D5E5D5] rounded-full text-[#5a5f7c] hover:bg-[#ADB2D4] transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-1">
            {files.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-[#5a5f7c]' : 'bg-[#ADB2D4]'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-2 bg-[#D5E5D5] rounded-full text-[#5a5f7c] hover:bg-[#ADB2D4] transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileandFolderSlide;