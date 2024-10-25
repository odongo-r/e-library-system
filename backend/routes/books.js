const express = require('express');
const { getBooks } = require('../controllers/bookController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, getBooks);

module.exports = router;
