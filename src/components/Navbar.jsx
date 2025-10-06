import cmuLogo from '../assets/cmu-logo.png';
import { Link } from 'react-router-dom';

const navItems = [
    //{ name: 'Download', path: 'https://l.facebook.com/l.php?u=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1h5u2DqtaJxYZsM2wjSgD_SJ37HsBrYyp%2Fview%3Fusp%3Ddrive_link%26fbclid%3DIwZXh0bgNhZW0CMTAAAR3hUkJa8Ctjp78FzXokmc-_TsUUBy2NNmVPOVyQvJdGhdFvx1oEJWLb2y8_aem_vKUfQmnytakCk8l679uu7Q&h=AT37g4kcAnVWDcceqy5jHuFKuN07mBLnu4yFPLVxWlgbr12n9R-Qt5fLM0qzg7_IvXJL-HsPLlBdkP39nyfGemyqg4Y_BvPDF17PxsRL-jm8NlAvAomLhzkJ2aiA0CjP6R8jdA' },
    { name: 'About Hazard World', path: '/about' },
    { name: 'Announcements', path: '/announcements' },
    //{ name: 'Credits', path: '/credits' },
];

const Navbar = () => {
    return (
        
        <div className="navbar fixed-top">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <Link to="/" className="me-4">
                        <img src={cmuLogo} alt="Logo" width="200" height="60" />
                    </Link>
                    <ul className="d-flex list-unstyled mb-0 ms-3">
                        {navItems.map((item, index) => (
                            <li key={index} className="me-4">
                                <Link className="nav-link" to={item.path}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link to="/login">
                    <button className="btn btn-primary">Admin Login</button>
                </Link>
            </div>
        </div>
    );
};


export default Navbar;