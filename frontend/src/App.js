// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div>
                <h1>E-Library System</h1>
                <Routes>
                    <Route path="/" element={<h2>Welcome to the E-Library</h2>} />
                    {/* Additional routes will go here */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;

