const { registerUser, registerAdmin, login } = require("../controller/AuthData");

const express = require("express");
const routes = express.Router();

routes.post("/user/register", registerUser)
routes.post("/admin/register", registerAdmin)
routes.post("/auth/login", login)


module.exports = routes