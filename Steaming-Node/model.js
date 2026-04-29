const mongoose = require("mongoose")

const OtpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expries: 60

    }
})

module.exports = mongoose.model("opt", OtpSchema)

