// File: src/pages/Recent.tsx
import React, { useState, useEffect } from 'react';
import { recentService, RecentItem } from '../services/recent.service';
import { Item } from '../types/item';
import FileViewerModal from '../components/FileViewerModal/FileViewerModal';
import { useRecentItems } from '../hooks/useRecentItems';
import {
  ClockCounterClockwise,
  File,
  Folder,
  Image,
  MusicNote,
  FilmStrip,
  FileText,
  TrashSimple
} from '@phosphor-icons/react';

const Recent: React.FC<{ driveName: string }> = ({ driveName }) => {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<Item | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { addRecentItem } = useRecentItems();

  useEffect(() => {
    updateRecentItems();
  }, []);

  const updateRecentItems = () => {
    const items = recentService.getRecentItems();
    setRecentItems(items);
  };

  const getFileIcon = (mimeType: string) => {
    const iconClass = "text-[#7EA8F8]";
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

  const handleClearRecent = () => {
    recentService.clearRecentItems();
    updateRecentItems();
  };

  const convertToItem = (recentItem: RecentItem): Item => ({
    id: recentItem.id,
    name: recentItem.name,
    size: recentItem.size,
    isFolder: false, // Recent items are always files
    webContentLink: recentItem.webContentLink,
    webViewLink: recentItem.webViewLink,
    mimeType: recentItem.mimeType || 'application/octet-stream',
    parentPath: recentItem.parentPath || '/'
  });

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(135deg, #E6F0FF 0%, #D1E3FF 100%)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 p-4 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.4)' }}>
          <ClockCounterClockwise size={32} weight="fill" className="text-[#4A89DC] mr-3" />
          <h1 className="text-3xl font-bold text-[#3A6DB0]">Recently Viewed</h1>
          {recentItems.length > 0 && (
            <button
              onClick={handleClearRecent}
              className="ml-auto bg-gradient-to-r from-[#7EA8F8] to-[#4A89DC] text-white px-4 py-2 rounded-full flex items-center shadow-lg hover:shadow-xl transition-all"
            >
              <TrashSimple size={20} weight="fill" className="mr-2" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Content */}
        {recentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentItems.map((recentItem) => {
              const item = convertToItem(recentItem);
              return (
                <div 
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleItemClick(item)}
                  className="relative bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 overflow-hidden group"
                >
                  {/* Animated border gradient */}
                  <div className={`absolute inset-0 rounded-xl p-0.5 ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    <div className="w-full h-full rounded-lg bg-gradient-to-r from-[#7EA8F8] via-[#A5C4FF] to-[#4A89DC] animate-gradient-xy"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative bg-white rounded-lg p-4 h-full">
                    <div className="flex items-center mb-3">
                      {getFileIcon(item.mimeType)}
                      <span className="font-medium text-[#3A6DB0] ml-3 truncate">
                        {item.name}
                      </span>
                    </div>
     
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs px-2 py-1 rounded-full bg-[#E6F0FF] text-[#4A89DC] truncate max-w-[120px] inline-block">
                        {item.mimeType.split('/')[1] || 'file'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.4)' }}>
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-[#7EA8F8] to-[#4A89DC] rounded-full flex items-center justify-center mb-6 shadow-lg">
              <ClockCounterClockwise size={48} weight="duotone" className="text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-[#3A6DB0] mb-2">No recent files</h2>
            <p className="text-[#7EA8F8] max-w-md mx-auto">
              View some files to see them appear here
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

export default Recent;