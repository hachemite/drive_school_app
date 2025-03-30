// // useDriveItems.ts
// import { useState, useEffect, useCallback } from 'react';
// import { fetchItems } from '../services/drive.service';
// import { FetchItemsResult, Item } from '../types/item';

// export const useItems = (
//   driveName: string,
//   initialPath: string = ''
// ): FetchItemsResult => {
//   const [state, setState] = useState<Omit<FetchItemsResult, 'refresh'>>({
//     items: [],
//     currentPath: initialPath,
//     currentFolderId: '',
//     isLoading: false,
//     error: null,
//   });

//   const fetchData = useCallback(async (signal?: AbortSignal) => {
//     setState(prev => ({ ...prev, isLoading: true, error: null }));
    
//     const result = await fetchItems(driveName, initialPath, signal);
    
//     if (result.success && result.data) {
//       setState({
//         items: result.data.items,
//         currentPath: result.data.currentPath,
//         currentFolderId: result.data.currentFolderId,
//         isLoading: false,
//         error: null,
//       });
//     } else {
//       setState(prev => ({
//         ...prev,
//         isLoading: false,
//         error: result.error || 'Failed to load items',
//       }));
//     }
//   }, [driveName, initialPath]);

//   const refresh = useCallback(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     const abortController = new AbortController();
//     if (driveName) {
//       fetchData(abortController.signal);
//     }

//     return () => {
//       abortController.abort();
//     };
//   }, [driveName, fetchData]);

//   return {
//     ...state,
//     refresh,
//   };
// };

export{}