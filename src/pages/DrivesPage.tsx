// File: drive-course-app/src/pages/DrivesPage.tsx
import React, { useState } from 'react';
import { useDrives } from '../hooks/useDrives';
import DriveCard from '../components/DriveCard/DriveCard';
import SearchComponent from '../components/Search/search';

const DrivesPage: React.FC = () => {
  const { drives, loading, error } = useDrives();
  const [isSearchActive, setIsSearchActive] = useState(false);

  if (loading) return <div>Loading drives...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="drives-container">
      <h1>Available Drives</h1>
      <SearchComponent onSearchActive={setIsSearchActive} />
      {!isSearchActive && (
        <div className="drives-list">
          {drives.map((drive) => (
            <DriveCard key={drive._id} drive={drive} />
          ))}

        </div>
      )}
    </div>
  );
};

export default DrivesPage;