// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <Link to="/" className="logo">
                    <img src={logo} alt="Logo" className="logo-image" />
                </Link>
                <Link to="/" className="logo-text">E-Library</Link> {/* Added E-Library text */}
            </div>
            <ul className="nav-links">
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

