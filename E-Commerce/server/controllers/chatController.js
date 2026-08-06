const asyncHandler = require('../middleware/asyncHandler');
const Message = require('../models/messageModel');

// @desc    Get user's chat history
// @route   GET /api/chat
// @access  Private
const getChatHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  // Find messages where the user is either sender or receiver
  const messages = await Message.find({
    $or: [
      { sender: userId },
      { receiver: userId }
    ]
  }).sort({ createdAt: 1 }).populate('sender', 'name profileImage').populate('receiver', 'name profileImage');

  res.json({ success: true, messages });
});

// @desc    Get all active chats (Admin only)
// @route   GET /api/chat/admin
// @access  Private/Admin
const getAdminChats = asyncHandler(async (req, res) => {
  // Aggregate to get latest message per user
  const latestMessages = await Message.aggregate([
    {
      $sort: { createdAt: -1 }
    },
    {
      $group: {
        _id: {
          $cond: [
            { $eq: ["$isFromAdmin", true] },
            "$receiver",
            "$sender"
          ]
        },
        latestMessage: { $first: "$$ROOT" }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 1,
        "user.name": 1,
        "user.profileImage": 1,
        "latestMessage.text": 1,
        "latestMessage.createdAt": 1,
        "latestMessage.isFromAdmin": 1,
        "latestMessage.read": 1
      }
    },
    { $sort: { "latestMessage.createdAt": -1 } }
  ]);

  res.json({ success: true, chats: latestMessages });
});

// @desc    Get specific user's chat history (Admin only)
// @route   GET /api/chat/admin/:userId
// @access  Private/Admin
const getAdminChatHistory = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  
  const messages = await Message.find({
    $or: [
      { sender: userId },
      { receiver: userId }
    ]
  }).sort({ createdAt: 1 }).populate('sender', 'name profileImage').populate('receiver', 'name profileImage');

  res.json({ success: true, messages });
});

// @desc    Mark messages as read
// @route   PUT /api/chat/read
// @access  Private
const markAsRead = asyncHandler(async (req, res) => {
  const { senderId } = req.body;
  
  await Message.updateMany(
    { sender: senderId, receiver: req.user._id, read: false },
    { $set: { read: true } }
  );

  res.json({ success: true });
});

module.exports = {
  getChatHistory,
  getAdminChats,
  getAdminChatHistory,
  markAsRead
};
