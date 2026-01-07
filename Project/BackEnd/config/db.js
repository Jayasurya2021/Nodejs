const mongoose = require('mongoose');

const Database = async function () {
    await mongoose.connect("mongodb://localhost:27017/testdata")
    .then(()=>console.log("mongodb is connected"))
    .catch(err=>console.log(err))
}

module.exports = Database