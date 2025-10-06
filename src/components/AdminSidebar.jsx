import { Link } from 'react-router-dom';
import hazardLogo from '../assets/hazard-logo.png';

const AdminSidebar = () => {
    return (
        <div
            className="bg-blue vh-100 position-fixed"
            style={{ width: '250px', zIndex: '200' }}
        >
            <Link to="/" className="p-2 me-4">
                <img src={hazardLogo} alt="Logo" width="240" height="40" className='my-2' />
            </Link>

            <ul className="list-unstyled p-3">
                <li className="mb-3">
                    <i className="bi bi-border-style me-2 text-white"></i>
                    <Link to="/admin" className='text-decoration-none text-white'>Dashboard</Link>
                </li>
                <li className="mb-3">
                    <i className="bi bi-file-earmark-text me-2 text-white"></i>
                    <Link to="/admin/assessments" className='text-decoration-none text-white'>Assessments</Link>
                </li>
                <li className="mb-3">
                    <i className="bi bi-megaphone me-2 text-white"></i>
                    <Link to="/admin/announcements" className='text-decoration-none text-white'>Announcements</Link>
                </li>
                <li>
                    <i className="bi bi-people me-2 text-white"></i>
                    <Link to="/admin/users" className='text-decoration-none text-white'>Users</Link>
                </li>
            </ul>
        </div>
    );
}

export default AdminSidebar;
