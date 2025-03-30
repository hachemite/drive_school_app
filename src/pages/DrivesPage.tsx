import React from 'react';
import { useDrives } from '../hooks/useDrives';
import DriveCard from '../components/DriveCard/DriveCard';

const DrivesPage: React.FC = () => {
  const { drives, loading, error } = useDrives();

  if (loading) return <div>Loading drives...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="drives-container">
      <h1>Available Drives</h1>
      <div className="drives-list">
        {drives.map((drive) => (
          <DriveCard key={drive._id} drive={drive}
           />
        ))}
      </div>
    </div>
  );
};

export default DrivesPage;