const mongoose = require("mongoose")

async function DB() {
    await mongoose.connect("mongodb://localhost:27017/MaviSolution")
        .then(() => console.log("mongodb is connected"))
        .catch((err) => console.log(err))
}

module.exports = DB