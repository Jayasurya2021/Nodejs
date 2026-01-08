const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== 'user') {
            return res.status(403).json({ message: "Access denied. Users only." });
        }

        next();
    } catch (error) {
        console.error("Auth Middleware - Error:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

const authAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        next();
    } catch (error) {
        console.error("Auth Middleware - Error:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { authUser, authAdmin };      