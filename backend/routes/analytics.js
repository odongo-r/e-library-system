// backend/routes/analytics.js
const express = require('express');
const { Borrowing } = require('../models/Borrowing');
const router = express.Router();

router.get('/book/:bookId', async (req, res) => {
  const { bookId } = req.params;
  try {
    const borrowCount = await Borrowing.countDocuments({ bookId });
    res.json({ bookId, borrowCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error });
  }
});

module.exports = router;
