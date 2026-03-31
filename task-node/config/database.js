const mongoose = require("mongoose")

const database = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/database_name")
    .then(()=>console.log("mongodb is running"))
    .catch((error)=>console.log(error))
}

module.exports =  database 