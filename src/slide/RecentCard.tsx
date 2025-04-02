// File: src/components/RecentCard.tsx
import React, { useState, useEffect } from 'react';
import { recentService, RecentItem } from '../services/recent.service';
import { useHistory } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';
import { Item } from '../types/item';

interface RecentCardProps {
  onItemClick: (file: Item) => void;
}

const RecentCard: React.FC<RecentCardProps> = ({ onItemClick }) => {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const items = recentService.getRecentItems().slice(0, 5); // Only show 5 most recent
    setRecentItems(items);
  }, []);

  const convertToItem = (recentItem: RecentItem): Item => ({
    id: recentItem.id,
    name: recentItem.name,
    size: recentItem.size,
    isFolder: false,
    webContentLink: recentItem.webContentLink,
    webViewLink: recentItem.webViewLink,
    mimeType: recentItem.mimeType || 'application/octet-stream',
    parentPath: recentItem.parentPath || '/'
  });

  const nextItem = () => {
    setCurrentIndex((prev) => (prev === recentItems.length - 1 ? 0 : prev + 1));
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev === 0 ? recentItems.length - 1 : prev - 1));
  };

  const handleNavigateToRecent = () => {
    history.push('/recent');
  };

  if (recentItems.length === 0) return null;

  const currentItem = recentItems[currentIndex];
  const truncatedName = currentItem.name.length > 20 
    ? `${currentItem.name.substring(0, 20)}...` 
    : currentItem.name;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-48'}`}>
      <div className="bg-[#EEF1DA] rounded-lg shadow-lg overflow-hidden border border-[#ADB2D4]">
        <div 
          className="bg-[#D5E5D5] p-2 flex justify-between items-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#5a5f7c]" />
            <span className="text-sm font-medium text-[#5a5f7c]">Recent Files</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
            className="text-[#5a5f7c] hover:text-[#ADB2D4]"
          >
            <X size={16} />
          </button>
        </div>

        {isExpanded ? (
          <div className="p-3">
            <div className="flex flex-col gap-2">
              {recentItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-2 rounded-md cursor-pointer hover:bg-[#C7D9DD] ${currentIndex === index ? 'bg-[#ADB2D4]' : ''}`}
                  onClick={() => {
                    onItemClick(convertToItem(item));
                    setIsExpanded(false);
                  }}
                >
                  <p className="text-sm text-[#5a5f7c] truncate">{item.name}</p>
                </div>
              ))}
            </div>
            <button
              onClick={handleNavigateToRecent}
              className="w-full mt-2 py-1 text-sm text-center text-[#5a5f7c] hover:text-[#ADB2D4]"
            >
              View All Recent
            </button>
          </div>
        ) : (
          <div className="p-3">
            <div className="flex items-center justify-between">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  prevItem();
                }}
                className="p-1 text-[#5a5f7c] hover:text-[#ADB2D4]"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div 
                className="flex-1 text-center px-2 cursor-pointer"
                onClick={() => {
                  onItemClick(convertToItem(currentItem));
                  setIsExpanded(false);
                }}
              >
                <p className="text-sm text-[#5a5f7c]">{truncatedName}</p>
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  nextItem();
                }}
                className="p-1 text-[#5a5f7c] hover:text-[#ADB2D4]"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentCard;