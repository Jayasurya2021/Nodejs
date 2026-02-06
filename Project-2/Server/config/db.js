const mongoose =  require("mongoose")

const dataBase = async ()=>{
    await mongoose.connect("mongodb://localhost:27017/project")
    .then(()=>console.log("mongodb is connected"))
    .catch((err)=>console.log(err))
}

module.exports = dataBase