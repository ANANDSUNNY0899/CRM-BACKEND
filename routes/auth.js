const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const User = require('../models/User'); 


router.post('/', registerUser);


router.post('/login', loginUser);


router.get('/profile', protect, getUserProfile);


router.get('/all', protect, async (req, res) => {
  console.log('GET /api/users/all hit');
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

module.exports = router;
