const asyncHandler = require('../middleware/asyncHandler');
const UserSession = require('../models/userSessionModel');

// @desc    Get all active sessions for the logged-in user
// @route   GET /api/security/sessions
// @access  Private
const getSessions = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const sessions = await UserSession.find({ userId: req.user._id, isActive: true })
    .sort({ lastActiveAt: -1 })
    .skip(skip)
    .limit(limit);

  // Map to match the frontend requirements
  const mappedSessions = sessions.map(session => ({
    _id: session._id,
    sessionId: session.sessionId,
    deviceName: session.deviceName,
    browser: session.browser,
    os: session.os,
    ipAddress: session.ipAddress,
    city: session.city,
    state: session.state,
    country: session.country,
    loginAt: session.loginAt,
    lastActiveAt: session.lastActiveAt,
    isCurrentDevice: session.sessionId === req.sessionId
  }));

  res.json(mappedSessions);
});

// @desc    Logout a single device
// @route   DELETE /api/security/session/:sessionId
// @access  Private
const revokeSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  const session = await UserSession.findOne({ sessionId, userId: req.user._id });
  
  if (!session) {
    res.status(404);
    throw new Error('Session not found');
  }

  session.isActive = false;
  await session.save();

  res.json({ success: true, message: 'Session revoked successfully' });
});

// @desc    Logout all devices except the current device
// @route   DELETE /api/security/logout-all
// @access  Private
const revokeAllOtherSessions = asyncHandler(async (req, res) => {
  await UserSession.updateMany(
    { userId: req.user._id, sessionId: { $ne: req.sessionId } },
    { $set: { isActive: false } }
  );

  res.json({ success: true, message: 'All other sessions revoked successfully' });
});

module.exports = {
  getSessions,
  revokeSession,
  revokeAllOtherSessions
};
