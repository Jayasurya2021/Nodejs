const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const DB = require("./config/DB");
const { UserData } = require("./controller/UserDetails");
const { register, login } = require("./controller/AuthController");

dotenv.config();

app.use(cors());
app.use(express.json());

DB();

app.post("/api/contact", UserData);
app.post("/api/register", register);
app.post("/api/login", login);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});