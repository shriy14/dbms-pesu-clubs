import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/login" className="navbar-link">Login</Link>
        <Link to="/register" className="navbar-link">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
