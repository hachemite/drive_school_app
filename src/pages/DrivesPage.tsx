// File: drive-course-app/src/pages/DrivesPage.tsx
import React from 'react';
import { useDrives } from '../hooks/useDrives';
import DriveCard from '../components/DriveCard/DriveCard';
import { Loader2, AlertCircle } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

const DrivesPage: React.FC = () => {
  const { drives, loading, error } = useDrives();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Loading state
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-[#EEF1DA] rounded-2xl p-8 max-w-md w-full text-center">
        <Loader2 className="animate-spin h-12 w-12 text-[#F6B93B] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-[#5a5f7c] mb-2">Loading your drives</h2>
        <p className="text-[#ADB2D4]">Fetching your Google Drive information...</p>
      </div>
    </div>
  );

  // Error state
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-[#EEF1DA] rounded-2xl p-8 max-w-md w-full text-center">
        <AlertCircle className="h-12 w-12 text-[#F1A7A1] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-[#5a5f7c] mb-2">Error loading drives</h2>
        <p className="text-[#ADB2D4] mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-[#F6B93B] hover:bg-[#FAD7A1] text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className={`${isMobile ? 'px-2' : 'px-6'} py-8`}>
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#5a5f7c] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              My Google Drives
            </h1>
            <p className="text-[#ADB2D4]">
              {drives.length} {drives.length === 1 ? 'drive' : 'drives'} available
            </p>
          </div>
        </div>

        {/* Drives Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {drives.map((drive) => (
            <DriveCard key={drive._id} drive={drive} />
          ))}
        </div>

        {/* Empty State */}
        {drives.length === 0 && (
          <div className="bg-[#EEF1DA] rounded-2xl p-12 text-center">
            <div className="bg-[#F1C6D4] rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[#5a5f7c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#5a5f7c] mb-2">No drives found</h3>
            <p className="text-[#ADB2D4] max-w-md mx-auto">
              Connect your Google Drive to get started
            </p>
            <button className="mt-6 px-6 py-2 bg-[#ADB2D4] hover:bg-[#C7D9DD] text-white rounded-lg transition-colors">
              Connect Drive
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default DrivesPage;