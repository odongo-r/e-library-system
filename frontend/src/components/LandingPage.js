/* frontend/src/components/LandingPage.js */
import React from 'react';
import HeroSection from './HeroSection';
import Footer from './Footer';
import '../styles/LandingPage.css';
import logo from '../assets/logo.png';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <nav className="navbar">
                <div className="logo-container">
                    <a href="/" className="logo">
                        <img src={logo} alt="Logo" className="logo-image" />
                    </a>
                    <a href="/" className="logo-text">E-Library</a>
                </div>
                <ul className="nav-links">
                    <li><a href="/signup">Signup</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>

            <HeroSection />
            <Footer />
        </div>
    );
};

export default LandingPage;
