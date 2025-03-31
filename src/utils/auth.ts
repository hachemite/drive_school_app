// File: drive_school_app/src/utils/auth.ts
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};