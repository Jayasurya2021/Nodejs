const mongoose = require("mongoose")

const DB = async () => {
    await mongoose.connect("mongodb://localhost:27017/tasks")
        .then(() => console.log("mongodb is connected"))
        .catch((err) => console.log(err))
}

module.exports = DB