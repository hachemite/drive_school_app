import React from 'react';
import { useHistory } from 'react-router-dom';
import { Drive } from '../../types/drive';

interface DriveCardProps {
  drive: Drive;
}

const DriveCard: React.FC<DriveCardProps> = ({ drive }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/drive/${drive.driveName}`);
    window.location.reload();

  };

  return (
<div 
      className={`drive-card ${drive.isDefault ? 'default' : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <h3>{drive.driveName}</h3>
      {drive.isDefault && <span className="default-badge">Default</span>}
      {/* Add more drive details here */}
    </div>
  );
};

export default DriveCard;