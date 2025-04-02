// File: drive_school_app/src/components/Navbar/Navbar.tsx
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavLink from '../NavLink/NavLink';
import { logoutUser } from '../../api/authApi';
import { getCurrentUser, removeAuthToken } from '../../utils/auth';
import { Home, Star, Heart, Car, Settings, LogOut, MessageCircle, HelpCircle, Users } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

interface User {
  role: string;
  username: string;
  _id: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      removeAuthToken();
      setUser(null);
      history.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      removeAuthToken();
      setUser(null);
      history.push('/');
    }
  };

  const isAdmin = user && ['superuser', 'admin'].includes(user.role);

  const navItems = [
    { icon: <Home size={20} />, name: 'Home', path: '/' },
    { icon: <Star size={20} />, name: 'Recent', path: '/recent' },
    { icon: <Heart size={20} />, name: 'Favorites', path: '/favorites' },
    { icon: <Car size={20} />, name: 'Drives', path: '/drives' },
    ...(isAdmin ? [{ icon: <Settings size={20} />, name: 'Manage', path: '/drivemanager' }] : []),
    { icon: <MessageCircle size={20} />, name: 'Messages', path: '/communication' },
    { icon: <HelpCircle size={20} />, name: 'FAQ', path: '/faq' },
    { icon: <Users size={20} />, name: 'About', path: '/about' },
  ];

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#EEF1DA] to-[#C7D9DD] shadow-2xl z-50 py-2 px-1 backdrop-blur-sm">
        <div className="flex justify-around">
          {navItems.slice(0, 5).map((item, index) => (
            <NavLink key={index} to={item.path}>
              <div className="flex flex-col items-center p-1 transform hover:scale-110 transition-all duration-300">
                <span className="text-[#ADB2D4] hover:text-[#6b708a] transition-colors hover:animate-pulse">
                  {item.icon}
                </span>
                <span className="text-xs text-[#ADB2D4] mt-0.5 font-medium">
                  {item.name}
                </span>
              </div>
            </NavLink>
          ))}
          <div className="flex flex-col items-center p-1">
            {user ? (
              <button 
                onClick={handleLogout} 
                className="flex flex-col items-center transform hover:scale-110 transition-all duration-300"
              >
                <LogOut size={20} className="text-[#ADB2D4] hover:text-[#6b708a] hover:animate-pulse" />
                <span className="text-xs text-[#ADB2D4] mt-0.5 font-medium">Logout</span>
              </button>
            ) : (
              <NavLink to="/login">
                <div className="flex flex-col items-center transform hover:scale-110 transition-all duration-300">
                  <LogOut size={20} className="text-[#ADB2D4] hover:text-[#6b708a] hover:animate-pulse" />
                  <span className="text-xs text-[#ADB2D4] mt-0.5 font-medium">Login</span>
                </div>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed left-5 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-[#EEF1DA] to-[#C7D9DD] rounded-2xl p-3 shadow-2xl z-50 w-16 hover:w-48 transition-all duration-300 overflow-hidden group backdrop-blur-sm hover:backdrop-blur-md">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {navItems.map((item, index) => (
            <NavLink key={item.path} to={item.path}>
              <div className="flex items-center gap-3 p-1 rounded-lg  transition-all duration-300 ">
                <div className="min-w-[20px] flex-1 flex justify-center text-[#ADB2D4] group-hover:text-[#6b708a] transition-colors group-hover:flex-none transform group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="text-[#ADB2D4] group-hover:text-[#6b708a] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-medium">
                  {item.name}
                </span>
              </div>
            </NavLink>
          ))}
        </div>

        <div className="border-t border-white/30 pt-4 mt-1">
          {user ? (
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:shadow-inner"
              aria-label="Logout"
            >
              <div className="min-w-[20px] flex-1 flex justify-center text-[#ADB2D4] group-hover:text-[#6b708a] transition-colors group-hover:flex-none transform group-hover:scale-110">
                <LogOut size={20} strokeWidth={2.5} className="hover:animate-pulse" />
              </div>
              <span className="text-[#ADB2D4] group-hover:text-[#6b708a] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-medium">
                Logout
              </span>
            </button>
          ) : (
            <NavLink to="/login">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:shadow-inner">
                <div className="min-w-[20px] flex-1 flex justify-center text-[#ADB2D4] group-hover:text-[#6b708a] transition-colors group-hover:flex-none transform group-hover:scale-110">
                  <LogOut size={20} strokeWidth={2.5} className="hover:animate-pulse" />
                </div>
                <span className="text-[#ADB2D4] group-hover:text-[#6b708a] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-medium">
                  Login
                </span>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;