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
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);
