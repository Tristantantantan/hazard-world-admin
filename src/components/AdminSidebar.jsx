import { useState } from 'react';
import { Link } from 'react-router-dom';
import hazardLogo from '../assets/hazard-logo.png';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="sidebar-toggle d-lg-none"
        onClick={toggleSidebar}
      >
        <span className={`hamburger ${isOpen ? 'active' : ''}`}></span>
      </button>

      {/* Sidebar */}
      <div
        className={`admin-sidebar ${isOpen ? 'open' : ''}`}
        onClick={closeSidebar}
      >
        <div className="sidebar-content" onClick={(e) => e.stopPropagation()}>
          <Link to="/" className="p-2 d-block text-center">
            <img
              src={hazardLogo}
              alt="Logo"
              width="200"
              height="40"
              className="my-3"
            />
          </Link>

          <ul className="list-unstyled px-3">
            <li className="mb-3">
              <i className="bi bi-border-style me-2 text-white"></i>
              <Link to="/admin" className="text-decoration-none text-white">
                Dashboard
              </Link>
            </li>
            <li className="mb-3">
              <i className="bi bi-file-earmark-text me-2 text-white"></i>
              <Link to="/admin/assessments" className="text-decoration-none text-white">
                Assessments
              </Link>
            </li>
            <li className="mb-3">
              <i className="bi bi-megaphone me-2 text-white"></i>
              <Link to="/admin/announcements" className="text-decoration-none text-white">
                Announcements
              </Link>
            </li>
            <li>
              <i className="bi bi-people me-2 text-white"></i>
              <Link to="/admin/users" className="text-decoration-none text-white">
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
