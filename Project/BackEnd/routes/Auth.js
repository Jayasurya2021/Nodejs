const { registerData, login } = require("../controller/AuthData");

const express = require("express");
const routes = express.Router();

routes.post("/register", registerData)
routes.post("/login", login)


module.exports = routes