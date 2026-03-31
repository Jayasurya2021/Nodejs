const express = require("express")
const routes = express.Router()
const { Register } = require("../controllers/userform")
routes.post("/register", Register)



module.exports = routes