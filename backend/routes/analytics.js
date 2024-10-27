const express = require('express');
const router = express.Router();
const { getBorrowTrends } = require('../controllers/analyticsController');

router.get('/borrow-trends', getBorrowTrends);

module.exports = router;

