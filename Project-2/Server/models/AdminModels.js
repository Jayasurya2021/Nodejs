const mongoose = require("mongoose");

const adminModels = mongoose.Schema({
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
        default: "admin"
    }
})

module.exports = mongoose.model("adminData", adminModels);