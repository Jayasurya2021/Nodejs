const mongoose = require("mongoose")

const mongoDB = async ()=>{
    await mongoose.connect("mongodb://localhost:27017/addproduct")
    .then (console.log("mongodb is connected"))
    .catch((err)=>{console.log(err)})
}

module.exports = mongoDB