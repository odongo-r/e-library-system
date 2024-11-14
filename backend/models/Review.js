// backend/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming a User model exists
  review: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review };
