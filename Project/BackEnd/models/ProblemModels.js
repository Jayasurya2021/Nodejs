const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ["road", "water", "electricity", "garbage", "internet", "streetlight"]
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending"
    },
    adminRemarks: {
      type: String,
      default: ""
    },
    image: {
      type: String // Path to user upload
    },
    resolvedImage: {
      type: String // Path to admin proof
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);
