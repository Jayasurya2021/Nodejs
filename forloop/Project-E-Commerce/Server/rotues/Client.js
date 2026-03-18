const express =  require("express");
const ClientRoute = express.Router();
const {ClientRegister, Login} = require("../controller/ClientAuth")

ClientRoute.post("/register", ClientRegister )
ClientRoute.post("/login", Login )

module.exports = ClientRoute