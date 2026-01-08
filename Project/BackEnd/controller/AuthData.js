const userdata = require('../models/UserModel')
const admindata = require('../models/AdminModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Check if email exists in Users
        const existingUser = await userdata.findOne({ email })
        if (existingUser) {
            return res.status(201).json({ message: "This email already used by a user" })
        }

        // Check if email exists in Admins (Optional: prevent same email in both?)
        // For strict separation, maybe allow or disallow. Let's disallow for clarity.
        const existingAdmin = await admindata.findOne({ email });
        if (existingAdmin) {
            return res.status(201).json({ message: "This email is registered as admin" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const createuser = await userdata.create({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        })
        const token = jwt.sign({ id: createuser._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '10d' });
        res.status(201).json({ user: createuser, token })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, department } = req.body

        if (!department) {
            return res.status(400).json({ message: "Department is required for admin" });
        }

        const existingAdmin = await admindata.findOne({ email })
        if (existingAdmin) {
            return res.status(201).json({ message: "This email already used by an admin" })
        }

        const existingUser = await userdata.findOne({ email });
        if (existingUser) {
            return res.status(201).json({ message: "This email is registered as user" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const createadmin = await admindata.create({
            name,
            email,
            password: hashedPassword,
            department,
            role: 'admin'
        })
        const token = jwt.sign({ id: createadmin._id, role: 'admin', department }, process.env.JWT_SECRET, { expiresIn: '10d' });
        res.status(201).json({ user: createadmin, token })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check Admin
        let user = await admindata.findOne({ email });
        let role = 'admin';

        // 2. If not admin, Check User
        if (!user) {
            user = await userdata.findOne({ email });
            role = 'user';
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // compare user password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const payload = { id: user._id, role };
            if (role === 'admin') {
                payload.department = user.department;
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10d' });
            return res.status(200).json({ message: "login successfull", token, user });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === "surya@gmail.com" && password === "1234567") {
            const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: '10d' });
            return res.status(200).json({ message: "Admin login successful", token });
        } else {
            return res.status(401).json({ message: "Invalid admin credentials" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    registerAdmin,
    login
}
