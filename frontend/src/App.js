// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProfileSection from './components/ProfileSection';
import BooksManagement from './components/BooksManagement';
import BorrowingAndReservations from './components/BorrowingAndReservations';
import Highlights from './components/Highlights';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import Analytics from './components/Analytics';
import Recommendations from './components/Recommendations';
import ReviewSystem from './components/ReviewSystem';

function App() {
    const currentPath = window.location.pathname;

    return (
        <div className="app">
            {/* Only render the Navbar if not on the Dashboard */}
            {currentPath === '/' && <Navbar />}

            <Routes>
                <Route path="/" element={<HeroSection />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/highlights" element={<Highlights />} />
                <Route path="/aboutSection" element={<AboutSection />} />
                <Route path="/featuresSection" element={<FeaturesSection />} />
                
                {/* These routes link to the specific pages for the dashboard sections */}
                <Route path="/profile" element={<ProfileSection />} />
                <Route path="/books-management" element={<BooksManagement />} />
                <Route path="/borrowing-reservations" element={<BorrowingAndReservations />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/review-system" element={<ReviewSystem />} />
            </Routes>

            {/* Always render the Footer */}
            <Footer />
        </div>
    );
}

export default App;

