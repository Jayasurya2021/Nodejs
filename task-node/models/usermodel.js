const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    }
},{timestamps: true})

const userModel = mongoose.model("userdata", userSchema)
module.exports = userModel