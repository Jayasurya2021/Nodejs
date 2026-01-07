const userdata = require('../models/UserModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


const registerData = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const findEmailId = await userdata.findOne({ email })
        if (findEmailId) {
            return res.status(201).json({ message: "This email already used" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const createuser = await userdata.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: createuser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ user: createuser, token })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //find user email id
        const user = await userdata.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "You are not a user Please Register" });
        }
        //compare user password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: "login successfull", token, user });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    registerData,
    login
}
