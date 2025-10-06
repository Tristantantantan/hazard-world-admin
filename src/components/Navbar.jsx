import { useState } from 'react';
import cmuLogo from '../assets/cmu-logo.png';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'About Hazard World', path: '/about' },
  { name: 'Announcements', path: '/announcements' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar fixed-top">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="d-flex align-items-center">
          <img src={cmuLogo} alt="Logo" width="200" height="60" />
        </Link>

        {/* Hamburger button (visible on mobile only) */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon">☰</span>
        </button>

        {/* Nav links */}
        <ul
          className={`nav-links list-unstyled mb-0 d-flex flex-column flex-lg-row ${
            isOpen ? 'show' : 'hide'
          }`}
        >
          {navItems.map((item, index) => (
            <li key={index} className="me-lg-4 mb-2 mb-lg-0 text-center">
              <Link className="nav-link" to={item.path} onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            </li>
          ))}
          <li className="text-center">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="btn btn-primary">Admin Login</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
