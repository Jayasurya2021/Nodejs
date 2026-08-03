const jwt = require('jsonwebtoken');

const generateToken = (res, userId, sessionId = null) => {
  const payload = { userId };
  if (sessionId) payload.sessionId = sessionId;

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  // Set JWT as HTTP-Only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  return token;
};

module.exports = generateToken;
