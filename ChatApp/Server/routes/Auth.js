const express = require("express");
const route = express.Router()
const {register} = require("../controllers/userAuth")

route.post("/user", register)

module.exports = route