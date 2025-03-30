// File: drive_school_app\src\pages\Recent.tsx
import React, { useState, useEffect } from 'react';
import { recentService, RecentItem } from '../services/recent.service';
import { useHistory } from 'react-router-dom';

const Recent: React.FC = () => {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [emptyMessage, setEmptyMessage] = useState('Loading recent items...');
  const history = useHistory();
  
  useEffect(() => {
    const items = recentService.getRecentItems();
    setRecentItems(items);
    
    if (items.length === 0) {
      setEmptyMessage('No recent items found. View some files to see them here.');
    }
  }, []);
  
  const handleItemClick = (item: RecentItem) => {
    if (item.webViewLink || item.webContentLink) {
      window.open(item.webViewLink || item.webContentLink, '_blank');
    }
  };
  
  const handleNavigateToDrive = (driveName: string) => {
    history.push(`/drive/${driveName}`);
  };
  
  const handleClearRecent = () => {
    recentService.clearRecentItems();
    setRecentItems([]);
    setEmptyMessage('No recent items found. View some files to see them here.');
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = '#f0f0f0';
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = '#f9f9f9';
  };
  
  return (
    <div className="recent-page">
      <div className="recent-header">
        <h1>Recently Viewed Files</h1>
        {recentItems.length > 0 && (
          <button 
            onClick={handleClearRecent}
            className="clear-button"
          >
            Clear All
          </button>
        )}
      </div>
      
      {recentItems.length === 0 ? (
        <div className="empty-message">{emptyMessage}</div>
      ) : (
        <div className="recent-items-list">
          {recentItems.map((item) => (
            <div 
              key={`${item.id}-${item.driveName}`}
              className="recent-item"
              onClick={() => handleItemClick(item)}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <div className="item-header">
                <h3 className="item-title">📄 {item.name}</h3>
                {item.size && (
                  <span className="item-size">
                    {(parseInt(item.size) / 1024 / 1024).toFixed(2)} MB
                  </span>
                )}
              </div>
              
              <div className="item-footer">
                <span 
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleNavigateToDrive(item.driveName);
                  }}
                  className="drive-link"
                >
                  Drive: {item.driveName}
                </span>
                <span className="timestamp">{formatDate(item.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recent;