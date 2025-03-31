// File: drive_school_app/src/api/authApi.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';


export const authenticateUser = async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return await response.json();
  };
  
  export const getCurrentUser = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`);
    return await response.json();
  };
  
  export const logoutUser = async () => {
    await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST' });
  };