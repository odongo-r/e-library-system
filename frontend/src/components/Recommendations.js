import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import '../styles/Recommendations.css';

function Recommendations() {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  const handleDashboardClick = () => {
    navigate('/dashboard'); // Adjust the path based on your application's routing structure
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('/books/recommendations');
        setRecommendedBooks(response.data);
      } catch (error) {
        console.error('Error fetching recommendations', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="recommendations-container">
      <header className="management-header">
        <h2>Recommended Books</h2>
        <button className="logout-button" onClick={handleDashboardClick}>
          Dashboard
        </button>
      </header>
      <ul>
        {recommendedBooks.map((book) => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;

