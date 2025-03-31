// File: drive_school_app/src/components/Navbar/Navbar.tsx
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavLink from '../NavLink/NavLink';
import { logoutUser } from '../../api/authApi';
import { getCurrentUser, removeAuthToken } from '../../utils/auth';

interface User {
  role: string;
  username: string;
  _id: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      removeAuthToken();
      setUser(null);
      history.push('/'); // Redirect to home after logout
    } catch (error) {
      console.error('Logout error:', error);
      removeAuthToken();
      setUser(null);
      history.push('/'); // Still redirect to home even if API fails
    }
  };

  const isAdmin = user && ['superuser', 'admin'].includes(user.role);

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/recent">Recent</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      {user ? (
        <>
          {isAdmin && <NavLink to="/drives">Manage Drives</NavLink>}
          <button 
            onClick={handleLogout}
            className="logout-button"
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              font: 'inherit',
              padding: '0',
              margin: '0 1rem'
            }}
          >
            Logout ({user.username})
          </button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
      <NavLink to="/faq">FAQ</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
};
export default Navbar;