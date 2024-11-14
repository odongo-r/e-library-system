// backend/routes/recommendations.js
const express = require('express');
const { Review } = require('../models/Review');
const { Book } = require('../models/Book');
const router = express.Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const userReviews = await Review.find({ userId });
    const recommendedBooks = await Book.find({
      _id: { $nin: userReviews.map((review) => review.bookId) },
    }).limit(5);
    res.json(recommendedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations', error });
  }
});

module.exports = router;
