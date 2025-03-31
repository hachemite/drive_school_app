// File: drive_school_app/src/api/driveApi.ts
export const getDrives = async (): Promise<any[]> => {
    const response = await fetch('/api/drives');
    return await response.json();
  };
  
  export const addDrive = async (driveData: any) => {
    const response = await fetch('/api/drives', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(driveData),
    });
    return await response.json();
  };