const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "user"
  }

}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;