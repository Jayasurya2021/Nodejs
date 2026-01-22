const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    mobile:{
        type:Number,
        required: true
    },
    password:{
        type:String,
        required: true
    }

},{timestamps:true})

module.exports = userSchema