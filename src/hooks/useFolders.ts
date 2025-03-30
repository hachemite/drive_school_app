// // src/hooks/useFilesandFolder.ts
// import { useState, useEffect } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import { driveService } from '../services/drive.service';

// export const useFilesandFolder = () => {
//   const { driveName } = useParams<{ driveName: string }>();
//   const location = useLocation();
//   const [currentPath, setCurrentPath] = useState('');
//   const [files, setFiles] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const folderPath = queryParams.get('folderPath') || '';
//     setCurrentPath(folderPath);

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await driveService.fetchFiles(driveName!, folderPath);
//         if (response.error) {
//           throw new Error(response.error);
//         }
//         setFiles(response.files || []);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to fetch files');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [driveName, location.search]);

//   const navigateToFolder = (folderName: string) => {
//     const newPath = currentPath ? `${currentPath}/${folderName}` : folderName;
//     return `/drive/${driveName}?folderPath=${encodeURIComponent(newPath)}`;
//   };

//   return {
//     currentPath,
//     files,
//     loading,
//     error,
//     navigateToFolder,
//     driveName
//   };
// };
export {}