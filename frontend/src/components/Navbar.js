import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/search">
          <img
            src={logo}
            alt="Logo"
            style={{ width: '40px', height: '40px', marginRight: '10px' }}
          />
          Openverse
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex flex-row align-items-center mb-2 mb-lg-0">
            {!isLoggedIn && (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className="nav-item mx-2">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
