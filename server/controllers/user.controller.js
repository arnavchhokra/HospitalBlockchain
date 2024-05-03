const userModal = require("../model/user.modal")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


async function register(req, res) {
    try {
        const exisitingUser = await userModal.findOne({ mobile: req.body.mobile })
        if (exisitingUser) return res.status(200).send("User Already Exist")
        let password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword
        const newUser = new userModal(req.body)
        await newUser.save()
        res.status(201).send({ message: "Register Sucessfully", success: true });
    } catch (error) {
        res.status(500).send({
            message: `Internal server error ${error}`,
            success: false,
        });
    }
}
async function login(req, res) {
    try {
        const user = await userModal.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(200).send({ message: "User not found", success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(200).send({ message: "Invalid Email or Password", success: false });
        }

        // Validate login type
        if (user.logintype !== req.body.logintype) {
            return res.status(200).send({ message: "Invalid login type", success: false });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).send({ message: "Login Success", success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login ${error.message}` });
    }
}

async function getuser(req, res) {

}

module.exports = { register, login, getuser }