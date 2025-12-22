const mongoose = require('mongoose')

const createDB = async() =>{
    await mongoose.connect('mongodb://localhost:27017/crud-test')
    .then(()=>console.log("mongodb connected"))
    .catch(err=>console.log(err))
}

module.exports = createDB