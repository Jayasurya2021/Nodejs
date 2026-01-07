const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Auth Middleware - Token:", token);
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Auth Middleware - Decoded:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Auth Middleware - Error:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
};
module.exports = authMiddleware