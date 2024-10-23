// frontend/src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import Highlights from './Highlights';
import AboutSection from './AboutSection';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';
import './LandingPage.css'; // Import the CSS file for the landing page

const LandingPage = () => {
    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/demo">Demo</Link></li>
                </ul>
            </nav>
            <HeroSection />
            <Highlights />
            <AboutSection />
            <FeaturesSection />
            <Footer />
        </div>
    );
};

export default LandingPage;

