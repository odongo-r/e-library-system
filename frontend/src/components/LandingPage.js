// frontend/src/components/LandingPage.js
import React from 'react';
import HeroSection from './HeroSection';
import Highlights from './Highlights';
import AboutSection from './AboutSection';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';
import '../styles/LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <HeroSection />
            <Highlights />
            <AboutSection />
            <FeaturesSection />
            <Footer />
        </div>
    );
};

export default LandingPage;

