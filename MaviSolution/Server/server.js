const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const DB = require("./config/DB");
const { UserData } = require("./controller/UserDetails");

dotenv.config();

app.use(cors());
app.use(express.json());

DB();

app.post("/api/contact", UserData);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});