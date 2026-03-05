const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * protect  – verifies the JWT token sent in the Authorization header.
 * Usage: add as middleware to any route that requires authentication.
 *
 * The client must send the token as:
 *   Authorization: Bearer <token>
 */
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the user (without password) to the request
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({ success: false, message: "Not authorized, token invalid" });
    }
};

/**
 * adminOnly  – use AFTER protect.  Allows only admin-role users.
 */
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }
    return res.status(403).json({ success: false, message: "Access denied: Admins only" });
};

module.exports = { protect, adminOnly };
