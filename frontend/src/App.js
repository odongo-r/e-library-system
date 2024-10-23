// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';  
import LandingPage from './components/LandingPage';
import AddBook from './components/AddBook'; // Keep AddBook if needed

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/add-book" element={<AddBook />} />
                    {/* Additional routes will go here */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;

