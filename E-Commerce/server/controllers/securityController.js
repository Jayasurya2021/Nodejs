const asyncHandler = require('../middleware/asyncHandler');
const UserSession = require('../models/userSessionModel');
const UAParser = require('ua-parser-js');

// @desc    Get all active sessions for the logged-in user
// @route   GET /api/security/sessions
// @access  Private
const getSessions = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  let sessions = await UserSession.find({ userId: req.user._id, isActive: true })
    .sort({ lastActiveAt: -1 })
    .skip(skip)
    .limit(limit);

  // Fallback for legacy tokens if no active sessions exist
  if (sessions.length === 0) {
    const parser = new UAParser(req.headers['user-agent']);
    const result = parser.getResult();
    
    const geoip = require('geoip-lite');
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || 'Unknown IP';
    const geo = geoip.lookup(ipAddress === '::1' ? '127.0.0.1' : ipAddress);
    
    sessions = [{
      _id: 'legacy-session',
      sessionId: req.sessionId || 'legacy',
      deviceName: result.device.model || result.device.vendor || result.os.name || 'Desktop / Laptop',
      browser: result.browser.name || 'Unknown Browser',
      os: result.os.name || 'Unknown OS',
      ipAddress: ipAddress,
      city: geo ? geo.city || 'Unknown' : 'Unknown',
      state: geo ? geo.region || 'Unknown' : 'Unknown',
      country: geo ? geo.country || 'Unknown' : 'Unknown',
      loginAt: Date.now(),
      lastActiveAt: Date.now()
    }];
  }

  // Map to match the frontend requirements
  const mappedSessions = sessions.map(session => {
    // Check if session is a mongoose document, if so, we extract properties
    const s = session._id === 'legacy-session' ? session : session.toObject();
    return {
      _id: s._id,
      sessionId: s.sessionId,
      deviceName: s.deviceName,
      browser: s.browser,
      os: s.os,
      ipAddress: s.ipAddress,
      city: s.city,
      state: s.state,
      country: s.country,
      loginAt: s.loginAt,
      lastActiveAt: s.lastActiveAt,
      isCurrentDevice: s._id === 'legacy-session' || s.sessionId === req.sessionId
    };
  });

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
