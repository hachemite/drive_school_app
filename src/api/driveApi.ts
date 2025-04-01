// File: drive_school_app/src/api/driveApi.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getDrives = async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/api/drives`);
    if (!response.ok) throw new Error('Failed to fetch drives');
    return await response.json();
};


export const addDrive = async (driveData: any, token: string)=> {
  const response = await fetch(`${API_BASE_URL}/api/drives`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(driveData),
  });
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add drive');
  }
  return await response.json();
};