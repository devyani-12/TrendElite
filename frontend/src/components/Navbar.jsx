import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false); // Update isLoggedIn state
        navigate('/'); // Redirect to login page
    };

    const handleCreatePost = () => {
        navigate('/create-post');
    };

    return (
        <div className='container'>
            <nav className="navbar">
               
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li><a href='#' onClick={handleCreatePost}>Create Post</a></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><a href='#' onClick={handleLogout}>Logout</a></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
