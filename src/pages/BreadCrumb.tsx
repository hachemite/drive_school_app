// src/components/Breadcrumbs.tsx
import React from 'react';

interface BreadcrumbsProps {
  currentPath: string;
  driveName: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPath, driveName }) => {
  const pathParts = currentPath.split('/').filter(Boolean);

  const handlePathClick = (pathSoFar: string) => {
    window.location.href = `/drive/${driveName}?folderPath=${encodeURIComponent(pathSoFar)}`;
  };

  return (
    <div className="breadcrumbs">
      <a href={`/drive/${driveName}`}>Root</a>
      {pathParts.map((part, index) => {
        const pathSoFar = pathParts.slice(0, index + 1).join('/');
        return (
          <React.Fragment key={pathSoFar}>
            <span> / </span>
            <button 
              onClick={() => handlePathClick(pathSoFar)}
              style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
            >
              {part}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;