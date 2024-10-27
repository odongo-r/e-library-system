import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import '../styles/ReviewForm.css';

function ReviewForm({ bookId }) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/books/${bookId}/reviews`, { review, rating }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Optionally, refresh the reviews list here.
      setReview(''); // Clear the review input after submission
      setRating(0); // Reset the rating
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review"
        className="review-textarea"
      />
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min="0"
        max="5"
        placeholder="Rate (0-5)"
        className="rating-input"
      />
      <button type="submit" className="submit-button">Submit Review</button>
    </form>
  );
}

export default ReviewForm;

