// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Demo from './components/Demo'; // A simple Demo component
import AboutSection from './components/AboutSection';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/about" element={<AboutSection />} />
            </Routes>
        </Router>
    );
};

export default App;

