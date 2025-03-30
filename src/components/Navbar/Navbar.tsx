import React from 'react';
import NavLink from '../NavLink/NavLink';

const Navbar: React.FC = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/recent">Recent</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      <NavLink to="/sign">Sign</NavLink>
      <NavLink to="/logout">Logout</NavLink>
      <NavLink to="/faq">FAQ</NavLink>
      <NavLink to="/about">About</NavLink>
        <NavLink to="/drives">Drives</NavLink>

    </nav>
  );
};

export default Navbar;