const mongoose = require("mongoose");

const userModels = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:["admin", "user"],
        default: "user"
    }
})

module.exports = mongoose.model("userData", userModels);