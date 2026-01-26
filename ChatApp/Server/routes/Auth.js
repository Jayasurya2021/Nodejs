const express = require("express");
const route = express.Router()
const {register, Login} = require("../controllers/userAuth")

route.post("/register", register)
route.get('/login', Login )

module.exports = route