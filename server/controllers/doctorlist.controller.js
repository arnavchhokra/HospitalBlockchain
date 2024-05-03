const doctorlist = require("../model/DoctorList.modal")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function register(req, res) {
    try {
        const exisitingUser = await doctorlist.findOne({ email: req.body.email })
        if (exisitingUser) return res.status(409).send("Doctor Already Exist")
        let password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword

        let newdoctor = new doctorlist(req.body)
        newdoctor.isApproveByAdmin = false
        await newdoctor.save()
        res.status(201).send({ message: "Register Sucessfully", success: true });
    } catch (error) {
        res.status(500).send({
            message: `Internal server error`,
            success: false,
        });
    }

}

async function login(req, res) {
    try {
        const user = await doctorlist.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: "Doctor not found", success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(401).send({ message: "Invalid Email or Password", success: false });
        }
        if (user.isApproveByAdmin) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            res.status(200).send({ message: "Login Success", success: true, token });
        }
        else {
            res.status(401).send({ message: "Admin has not approved yet", success: false });
        }

    } catch (error) {
        res.status(500).send({
            message: `Internal server error`,
            success: false,
        });
    }
}


async function getDoctors(req, res) {
    try {

        let doctors = await doctorlist.find();

        if (doctors.length > 0) {
            res.status(200).send(doctors);
        }
        else {
            return res.status(404).send({ message: "doctors data not found", success: false });
        }
    } catch (error) {
        res.status(500).send({
            message: `Internal server error`,
            success: false,
        });
    }
}

async function approve(req, res) {
    try {
        let doctor = await doctorlist.findOne({ email: req.body.email });
        if (!doctor) return res.status(404).send({ message: "doctor data not found", success: false });
        doctor.isApproveByAdmin = true;
        await doctor.save();
        res.status(200).send({ message: "doctor is approved", success: true });
    } catch (error) {
        res.status(500).send({
            message: `Internal server error`,
            success: false,
        });
    }
}
module.exports = { register, login, getDoctors, approve }
