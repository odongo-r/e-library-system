/* frontend/src/App.js */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
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
import BooksList from './components/BooksList';


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/highlights" element={<Highlights />} />
                <Route path="/aboutSection" element={<AboutSection />} />
                <Route path="/featuresSection" element={<FeaturesSection />} />
                <Route path="/heroSection" element={<HeroSection />} />
                
                {/* These routes link to the specific pages for the dashboard sections */}
                <Route path="/profile" element={<ProfileSection />} />
                <Route path="/books-management" element={<BooksManagement />} />
                <Route path="/booklist" element={<BooksList />} />
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


