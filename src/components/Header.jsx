import React from 'react';
import { Link } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import './Header.css';

const Header = ({ plants }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🌱</span>
            <h1>Plant Care Manager</h1>
          </Link>
          <div className="header-right">
            <NotificationBell plants={plants} />
            <nav className="nav">
              <Link to="/" className="nav-link">My Plants</Link>
              <Link to="/add" className="nav-link">Add Plant</Link>
              <Link to="/guide" className="nav-link">Guide</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;