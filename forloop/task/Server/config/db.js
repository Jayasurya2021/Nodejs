const mongoose = require("mongoose")

const DB = async () => {
    await mongoose.connect("mongodb://localhost:27017/tasks")
        .then(() => console.log("mongodb isa connected"))
        .catch((err) => console.log(err))
}

module.exports = DB