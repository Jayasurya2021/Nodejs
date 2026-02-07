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
        value: "Admin"
    }
})

module.exports = mongoose.model("adminData", adminModels);