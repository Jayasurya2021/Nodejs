const mongoose = require("mongoose")

const database = async ()=>{
    await mongoose.connect("mongodb://localhost:27017/chatapp")
    .then(()=>console.log("mongo db is connected"))
    .catch((err)=>console.log(err))
}

module.exports= database