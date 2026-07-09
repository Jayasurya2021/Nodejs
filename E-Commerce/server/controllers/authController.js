const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Google Sign In
// @route   POST /api/auth/google
// @access  Public
const googleSignIn = asyncHandler(async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    res.status(400);
    return next(new Error('No token provided'));
  }

  let email, name, picture, sub;

  // Determine token type: id_token (3-part JWT) vs access_token (opaque string)
  const isIdToken = token.split('.').length === 3;

  if (isIdToken) {
    // --- ID Token flow (e.g., from GoogleLogin credential) ---
    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      payload = ticket.getPayload();
    } catch {
      res.status(401);
      return next(new Error('Invalid or expired Google ID token'));
    }
    email   = payload.email;
    name    = payload.name;
    picture = payload.picture;
    sub     = payload.sub;
  } else {
    // --- Access Token flow (from useGoogleLogin hook) ---
    let data;
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      data = response.data;
    } catch {
      res.status(401);
      return next(new Error('Invalid or expired Google access token'));
    }
    email   = data.email;
    name    = data.name;
    picture = data.picture;
    sub     = data.sub;
  }

  if (!email) {
    res.status(400);
    return next(new Error('Could not retrieve email from Google. Please ensure email access is granted.'));
  }

  // Find or create user by email
  let user = await User.findOne({ email });

  if (user) {
    // Link Google account if not already linked, update profile image if changed
    let dirty = false;
    if (!user.googleId)                   { user.googleId = sub;        dirty = true; }
    if (user.profileImage !== picture)    { user.profileImage = picture; dirty = true; }
    if (dirty) await user.save();
  } else {
    // New Google-only user — no password required
    user = await User.create({
      name,
      email,
      googleId: sub,
      profileImage: picture,
      authProvider: 'google',
      emailVerified: true
    });
  }

  // Issue JWT cookie (same as local auth)
  generateToken(res, user._id);

  res.status(200).json({
    success: true,
    message: 'Google Sign-In successful',
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage
    }
  });
});


// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      addresses: user.addresses
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  googleSignIn
};
