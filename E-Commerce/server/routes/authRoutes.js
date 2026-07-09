const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  googleSignIn
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/google', googleSignIn);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;
