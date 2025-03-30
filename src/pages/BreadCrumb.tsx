// src/components/Breadcrumbs.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  currentPath: string;
  driveName: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPath, driveName }) => {
  const pathParts = currentPath.split('/').filter(Boolean);

  return (
    <div className="breadcrumbs">
      <Link to={`/drive/${driveName}`}>Root</Link>
      {pathParts.map((part, index) => {
        const pathSoFar = pathParts.slice(0, index + 1).join('/');
        return (
          <React.Fragment key={pathSoFar}>
            <span> / </span>
            <Link to={`/drive/${driveName}?folderPath=${encodeURIComponent(pathSoFar)}`}>
              {part}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;