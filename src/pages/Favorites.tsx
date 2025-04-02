// File: drive_school_app\src\pages\FavoritesPage.tsx
import React, { useState } from 'react';
import { Item } from '../types/item';
import { 
  Heart, 
  Star, 
  File, 
  Folder, 
  Image, 
  MusicNote, 
  FilmStrip, 
  FileText,
  X
} from '@phosphor-icons/react';
import FileViewerModal from '../components/FileViewerModal/FileViewerModal';
import { useRecentItems } from '../hooks/useRecentItems';

const FavoritesPage: React.FC<{ driveName: string }> = ({ driveName }) => {
  const [favorites, setFavorites] = useState<Item[]>([]);
  const [selectedFile, setSelectedFile] = useState<Item | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { addRecentItem } = useRecentItems();

  React.useEffect(() => {
    updateFavorites();
  }, []);

  const updateFavorites = () => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  };

  const getFileIcon = (mimeType: string) => {
    const iconClass = "text-[#FF9EB7]";
    if (mimeType.includes('folder')) return <Folder size={24} weight="fill" className={iconClass} />;
    if (mimeType.includes('image')) return <Image size={24} weight="fill" className={iconClass} />;
    if (mimeType.includes('audio')) return <MusicNote size={24} weight="fill" className={iconClass} />;
    if (mimeType.includes('video')) return <FilmStrip size={24} weight="fill" className={iconClass} />;
    if (mimeType.includes('pdf')) return <FileText size={24} weight="fill" className={iconClass} />;
    return <File size={24} weight="fill" className={iconClass} />;
  };

  const handleItemClick = (item: Item) => {
    if (item.mimeType.includes('folder')) {
      // Handle folder navigation if needed
    } else {
      setSelectedFile(item);
    }
  };

  const handleStarClick = (item: Item, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = currentFavorites.filter((fav: Item) => fav.id !== item.id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    updateFavorites();
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:p-6" style={{ background: 'linear-gradient(135deg, #FFD6E0 0%, #FAD7A1 100%)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 p-4 rounded-xl backdrop-blur-sm text-center sm:text-left" style={{ background: 'rgba(255, 255, 255, 0.4)' }}>
          <div className="flex items-center">
            <Heart size={32} weight="fill" className="text-[#FF6B9D] mr-3" />
            <h1 className="text-3xl sm:text-3xl font-bold text-[#D35D8C]">Favorites</h1>
          </div>
          <div className="hidden sm:flex ml-auto bg-gradient-to-r from-[#FF9EB7] to-[#FF6B9D] text-white px-4 py-2 rounded-full items-center shadow-lg hover:shadow-xl transition-shadow">
            <Star size={20} weight="fill" className="mr-2" />
            <span className="text-base sm:text-base">{favorites.length} starred items</span>
          </div>
        </div>

        {/* Content */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {favorites.map((item) => (
              <div 
                key={item.id}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleItemClick(item)}
                className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 overflow-hidden group"
              >
                {/* Animated border gradient */}
                <div className={`absolute inset-0 rounded-xl p-0.5 ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  <div className="w-full h-full rounded-lg bg-gradient-to-r from-[#FF9EB7] via-[#FAD7A1] to-[#FF6B9D] animate-gradient-xy"></div>
                </div>
                
                {/* Content */}
                <div className="relative bg-white/95 rounded-lg p-3 sm:p-4 h-full">
                  <div className="flex items-center mb-2 sm:mb-3">
                    {getFileIcon(item.mimeType)}
                    <span className="font-medium text-[#D35D8C] ml-2 sm:ml-3 text-sm sm:text-base truncate">
                      {item.name}
                    </span>
                  </div>
  
                  <div className="mt-3 sm:mt-4 flex justify-between items-center">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#FFF0F5] text-[#FF6B9D] truncate max-w-[100px] sm:max-w-[120px] inline-block">
                      {item.mimeType.split('/')[1] || 'file'}
                    </span>
                    <button 
                      onClick={(e) => handleStarClick(item, e)}
                      className="p-1 rounded-full hover:bg-[#FFF0F5] transition-colors active:scale-95"
                      aria-label="Remove from favorites"
                    >
                      <Star size={18} weight="fill" className="text-[#FF6B9D]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-20 rounded-xl backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.4)' }}>
            <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#FF9EB7] to-[#FF6B9D] rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Star size={40} weight="duotone" className="text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#D35D8C] mb-2">Your favorites collection is empty</h2>
            <p className="text-[#FF9EB7] max-w-md mx-auto px-4 text-sm sm:text-base">
              Click the star icon on any file to add it here
            </p>
          </div>
        )}
      </div>

      {/* File Viewer Modal */}
      {selectedFile && (
        <FileViewerModal 
          file={selectedFile} 
          onClose={() => setSelectedFile(null)}
          addRecentItem={addRecentItem}
          driveName={driveName}
        />
      )}
    </div>
  );
};

export default FavoritesPage;