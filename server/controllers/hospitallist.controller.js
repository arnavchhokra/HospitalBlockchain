const hospitallist = require("../model/HospitalList.modal")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function register(req, res) {
    try {
        const exisitingUser = await hospitallist.findOne({ email: req.body.email })
        if (exisitingUser) return res.status(409).send("Hospital Already Exist")
        const ishospitalname = await hospitallist.findOne({ hospitalname: req.body.hospitalname })
        if (ishospitalname) return res.status(409).send("Hospital name already exist")
        let password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword

        let newhospital = new hospitallist(req.body)
        newhospital.isApproveByAdmin = false
        await newhospital.save()
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
        const user = await hospitallist.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: "Hospital not found", success: false });
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


async function getHospitals(req, res) {
    try {

        let hospitals = await hospitallist.find();

        if (hospitals.length > 0) {
            res.status(200).send(hospitals);
        }
        else {
            return res.status(404).send({ message: "Hospital data not found", success: false });
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
        let Hospital = await hospitallist.findOne({ email: req.body.email });
        if (!Hospital) return res.status(404).send({ message: "Hospital data not found", success: false });
        Hospital.isApproveByAdmin = true;
        await Hospital.save();
        console.log(Hospital);
        res.status(200).send({ message: "Hospital is approved", success: true });
    } catch (error) {
        res.status(500).send({
            message: `Internal server error`,
            success: false,
        });
    }
}
module.exports = { register, login, getHospitals, approve }
