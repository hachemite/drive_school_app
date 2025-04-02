import React from 'react';
import { useHistory } from 'react-router-dom';
import { Drive } from '../../types/drive';

interface DriveCardProps {
  drive: Drive;
}

const DriveCard: React.FC<DriveCardProps> = ({ drive }) => {
  const history = useHistory();
  const colors = [
    '#FAD7A1', '#F6B93B', '#F1A7A1', '#F1C6D4', '#F9E4B7',
    '#ADB2D4', '#C7D9DD', '#D5E5D5', '#EEF1DA'
  ];

  // Generate a consistent color based on drive name
  const getDriveColor = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Get first letters of each word in drive name
  const getDriveInitials = (name: string) => {
    return name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 3);
  };

  const handleClick = () => {
    history.push(`/drive/${drive.driveName}`);
    window.location.reload();
  };

  return (
    <div 
      onClick={handleClick}
      className={`
        relative overflow-hidden
        rounded-2xl p-6 shadow-lg
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-xl
        active:scale-95 cursor-pointer
        flex flex-col items-center justify-center
        ${drive.isDefault ? 'ring-2 ring-[#F6B93B]' : ''}
      `}
      style={{ 
        backgroundColor: getDriveColor(drive.driveName),
        minHeight: '180px',
        fontFamily: "'Poppins', sans-serif" // Custom font family
      }}
    >
      {/* Drive Initials Badge */}
      <div className={`
        absolute -top-4 -right-4
        w-20 h-20 rounded-full
        flex items-center justify-center
        text-white font-bold text-2xl
        opacity-20
      `} style={{ 
        backgroundColor: getDriveColor(drive.driveName.split('').reverse().join(''))
      }}>
        {getDriveInitials(drive.driveName)}
      </div>

      {/* Drive Content - Centered */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-[#5a5f7c] tracking-wide" style={{
          fontFamily: "'Montserrat', sans-serif", // Different font for title
          fontWeight: 600,
          letterSpacing: '0.05em'
        }}>
          {drive.driveName}
        </h3>
        
        {drive.isDefault && (
          <span className={`
            inline-block mt-3 px-3 py-1 rounded-full
            text-xs font-semibold tracking-wider
            bg-[#F6B93B] text-white
            ${drive.isDefault ? 'animate-pulse' : ''}
          `}>
            DEFAULT
          </span>
        )}
      </div>

      {/* Hover overlay */}
      <div className={`
        absolute inset-0 bg-black bg-opacity-0
        hover:bg-opacity-10 transition-all
        rounded-2xl
      `} />
    </div>
  );
};

export default DriveCard;