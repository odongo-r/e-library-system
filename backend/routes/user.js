// backend/routes/user.js
const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  changePassword
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;
