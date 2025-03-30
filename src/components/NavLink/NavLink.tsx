import React from 'react';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // This will cause a full page reload
    window.location.href = to;
  };

  return (
    <a href={to} onClick={handleClick} style={{ textDecoration: 'none', color: 'inherit' }}>
      {children}
    </a>
  );
};

export default NavLink;