// src/components/Breadcrumbs.tsx
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

interface BreadcrumbsProps {
  currentPath: string;
  driveName: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPath, driveName }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const pathParts = currentPath.split('/').filter(Boolean);
  const colorPalette = [
    '#FAD7A1', '#F6B93B', '#F1A7A1', '#F1C6D4', '#F9E4B7',
    '#ADB2D4', '#C7D9DD', '#D5E5D5', '#EEF1DA'
  ];

  const handlePathClick = (pathSoFar: string) => {
    window.location.href = `/drive/${driveName}?folderPath=${encodeURIComponent(pathSoFar)}`;
  };

  // Get a color from the palette based on path depth
  const getPathColor = (index: number) => {
    return colorPalette[index % colorPalette.length];
  };

  return (
    <div className={`flex items-center ${isMobile ? 'text-sm' : 'text-base'} overflow-x-auto py-2 scrollbar-hide`}>
      {/* Root/home icon */}
      <button
        onClick={() => handlePathClick('')}
        className="flex items-center text-[#5a5f7c] hover:text-[#F6B93B] transition-colors"
      >
        <Home size={isMobile ? 16 : 18} className="mr-1" />
        {!isMobile && <span>Root</span>}
      </button>

      {pathParts.map((part, index) => {
        const pathSoFar = pathParts.slice(0, index + 1).join('/');
        const bgColor = getPathColor(index);
        const textColor = index % 3 === 0 ? '#5a5f7c' : '#3a3f5c'; // Alternate text colors for better contrast
        
        return (
          <React.Fragment key={pathSoFar}>
            <ChevronRight size={16} className="mx-1 text-[#ADB2D4]" />
            <button
              onClick={() => handlePathClick(pathSoFar)}
              className={`px-2 py-1 rounded-lg hover:opacity-90 transition-all flex items-center max-w-[120px] sm:max-w-[160px] truncate`}
              style={{
                backgroundColor: bgColor,
                color: textColor
              }}
              title={part}
            >
              <span className="truncate">{part}</span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;