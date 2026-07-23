/**
 * @file authController.js
 * @description Authentication controllers for local and Google Sign-In.
 * All async errors propagate to the global errorHandler via asyncHandler.
 */

const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ─── Local Auth ──────────────────────────────────────────────────────────────

// @desc    Authenticate user & issue JWT
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  if (user.authProvider === 'google' && !user.password) {
    res.status(400);
    throw new Error('This account uses Google Sign-In.');
  }

  if (!(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const token = generateToken(res, user._id);

  res.json({
    success: true,
    message: "Login successful",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage
    }
  });
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide name, email and password');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  let userRole = 'buyer';
  if (role === 'seller') {
    userRole = 'seller';
  }

  const user = await User.create({ name, email, password, role: userRole });

  if (!user) {
    res.status(400);
    throw new Error('Invalid user data');
  }

  const token = generateToken(res, user._id);

  res.status(201).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage
    }
  });
});

// ─── Google OAuth ────────────────────────────────────────────────────────────

// @desc    Sign in / register with Google
// @route   POST /api/auth/google
// @access  Public
const googleSignIn = asyncHandler(async (req, res) => {
  const { token, role } = req.body;

  if (!token) {
    res.status(400);
    throw new Error('No Google token provided');
  }

  let email, name, picture, sub;

  // Distinguish between an id_token (3-part JWT) and an access_token (opaque)
  const isIdToken = token.split('.').length === 3;

  if (isIdToken) {
    // ── ID Token flow ──────────────────────────────────────────────────────
    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      payload = ticket.getPayload();
    } catch {
      res.status(401);
      throw new Error('Invalid or expired Google ID token');
    }
    ({ email, name, picture, sub } = payload);
  } else {
    // ── Access Token flow (from useGoogleLogin hook) ───────────────────────
    let data;
    try {
      const response = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      data = response.data;
    } catch {
      res.status(401);
      throw new Error('Invalid or expired Google access token');
    }
    ({ email, name, picture, sub } = data);
  }

  if (!email) {
    res.status(400);
    throw new Error('Could not retrieve email from Google. Please grant email access.');
  }

  let requireRole = false;

  // Find existing user or create a new Google-only account
  let user = await User.findOne({ email });

  if (user) {
    // Link Google ID / update avatar if needed
    let dirty = false;
    if (!user.googleId)                { user.googleId = sub;        dirty = true; }
    if (user.profileImage !== picture) { user.profileImage = picture; dirty = true; }
    if (dirty) await user.save();
    
    // If an existing user somehow has 'pending' role, we should redirect them to complete profile
    if (user.role === 'pending') {
      requireRole = true;
    }
  } else {
    // New Google user — password field intentionally omitted
    let userRole = role || 'pending'; // Default new google users to pending so they can choose
    if (userRole === 'pending') {
      requireRole = true;
    }

    user = await User.create({
      name,
      email,
      googleId: sub,
      profileImage: picture,
      authProvider: 'google',
      emailVerified: true,
      role: userRole
    });
  }

  // Issue the same HTTP-only JWT cookie used by local auth
  const token = generateToken(res, user._id);

  res.status(200).json({
    success: true,
    message: 'Google Sign-In successful',
    token,
    requireRole,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage
    }
  });
});

// ─── Profile ─────────────────────────────────────────────────────────────────

// @desc    Logout — clear JWT cookie
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// @desc    Get current user's profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      addresses: user.addresses
    }
  });
});

// @desc    Update current user's profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name  = req.body.name  || user.name;
  user.email = req.body.email || user.email;

  // Only update password if explicitly provided
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.json({
    success: true,
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage
    }
  });
});

// @desc    Select role for new Google users
// @route   PATCH /api/auth/select-role
// @access  Private (Requires valid JWT but maybe pending role)
const selectRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (role !== 'buyer' && role !== 'seller') {
    res.status(400);
    throw new Error('Invalid role selected');
  }

  // Only allow updating role if it's currently pending (or if we want to allow switching, but usually just for pending)
  if (user.role !== 'pending' && user.role !== 'buyer' && user.role !== 'seller') {
    res.status(400);
    throw new Error('Role cannot be changed');
  }

  user.role = role;
  const updatedUser = await user.save();

  // Re-issue token just in case
  const token = generateToken(res, updatedUser._id);

  res.json({
    success: true,
    token,
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage
    }
  });
});

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  googleSignIn,
  selectRole
};
