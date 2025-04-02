// File: drive_school_app/src/components/NavLink/NavLink.tsx
import React from 'react';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = to;
  };

  return (
    <a 
      href={to} 
      onClick={handleClick} 
      className="block hover:bg-[#C7D9DD] rounded-lg transition-colors duration-200"
    >
      <div className="px-2 py-1.5">
        {children}
      </div>
    </a>
  );
};

export default NavLink;