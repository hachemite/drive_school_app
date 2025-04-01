// File: drive_school_app/src/pages/Logout.tsx
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../api/authApi';
import { removeAuthToken } from '../utils/auth';

const Logout: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutUser(); // Call API to invalidate token
        removeAuthToken(); // Clear local storage
        history.push('/'); // Redirect to login page
        window.location.reload();
      } catch (error) {
        console.error('Logout error:', error);
        // Still clear local storage even if API call fails
        removeAuthToken();
        history.push('/login');
      }
    };

    performLogout();
  }, [history]);

  return (
    <div className="logout-container">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;