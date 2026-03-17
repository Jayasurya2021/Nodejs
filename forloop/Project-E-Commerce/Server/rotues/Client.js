const express =  require("express");
const ClientRoute = express.Router();
const {ClientRegister} = require("../controller/ClientAuth")

ClientRoute.post("/register", ClientRegister )

module.exports = ClientRoute