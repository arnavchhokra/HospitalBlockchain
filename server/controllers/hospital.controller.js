const hospitalSchema = require("../model/hospital.modal")



async function setHospital(req, res) {
    try {
        let hospitalstatus = await hospitalSchema.findOne({ username: req.body.username })
        if (hospitalstatus) return res.status(200).send("User Already Exist")
        const newhospital = new hospitalSchema(req.body)
        await newhospital.save()
        console.log(newhospital);
        res.status(201).send({ message: "Medical Health of Customer added Sucessfully", success: true });
    } catch (error) {
        res.status(500).send({
            message: `Internal server error ${error}`,
            success: false,
        });
    }
}



async function gethospital(req, res) {
    try {
        let hospitalstatus = await hospitalSchema.findOne({ username: req.query.username })
        if (!hospitalstatus) return res.status(200).send("hospital deatils does not Exist")
        return res.status(201).send(hospitalstatus)
    } catch (error) {
        res.status(500).send({
            message: `Internal server error ${error}`,
            success: false,
        });
    }
}


module.exports = { setHospital, gethospital }