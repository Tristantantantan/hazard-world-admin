import { useState } from 'react';
import cmuLogo from '../assets/cmu-logo.png';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'About Hazard World', path: '/about' },
  { name: 'Announcements', path: '/announcements' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar fixed-top">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="d-flex align-items-center" onClick={closeMenu}>
          <img src={cmuLogo} alt="Logo" width="200" height="60" />
        </Link>

        {/* Hamburger icon */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={toggleMenu}
        >
          <span className={`hamburger ${menuOpen ? 'active' : ''}`}></span>
        </button>

        {/* Navigation links */}
        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className="nav-link" onClick={closeMenu}>
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/login" onClick={closeMenu}>
              <button className="btn btn-primary mt-2 mt-lg-0">Admin Login</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
