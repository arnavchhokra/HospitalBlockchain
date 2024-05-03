const contractSchema = require('../model/contract.modal')


async function createcontract(req, res) {
    try {
        let existContract = await contractSchema.findOne({ aadhar: req.body.aadhar })
        if (existContract) return res.status(200).send("User Already Exist")
        const newcontract = new contractSchema(req.body)
        await newcontract.save()
        res.status(201).send({ message: "Contract Created Sucessfully", success: true });
    } catch (error) {
        res.status(500).send({
            message: `Internal server error ${error}`,
            success: false,
        });
    }

}

async function getContract(req, res) {
    try {
        const latestContract = await contractSchema.findOne().sort({ _id: -1 }).exec();
    
        if (!latestContract) {
            return res.status(404).send({ error: "Cannot Find Contract" });
        }
    
        const contractData = latestContract.toObject();
        return res.status(201).send(contractData);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send({ error: "Internal Server Error" });
    } 


}



module.exports = { createcontract, getContract }