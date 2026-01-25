const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const problemRoutes = require("./routes/problemRoutes");
//server
const app = express();

const cors = require("cors");
// server port
const PORT = process.env.PORT || 5000;
const Auth = require("./routes/Auth")
app.use(cors(
    {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true
    }
));
app.use(express.json())
// Connect Database 
connectDB();

app.use('/api', Auth)

app.use('/api', problemRoutes);
app.use('/uploads', express.static('uploads'));


app.listen(PORT, () => {
    console.log("server is running")
})