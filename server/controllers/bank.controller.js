const bankSchema = require("../model/bank.modal")


async function setbank(req, res) {
    try {
        let bankstatus = await bankSchema.findOne({ username: req.body.username })
        if (bankstatus) return res.status(200).send("User Already Exist")
        const newbank = new bankSchema(req.body)
        await newbank.save()
        res.status(201).send({ message: "Financial Health of Customer added Sucessfully", success: true });

    } catch (error) {
        res.status(500).send({
            message: `Internal server error ${error}`,
            success: false,
        });
    }
}


async function getbank(req, res) {
    
    try {
         let getbankstatus = await bankSchema.findOne({ username: req.query.username })
        if (!getbankstatus) return res.status(200).send("bank deatils does not Exist")
       return res.status(201).send(getbankstatus);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" })
 
    }
}


module.exports = {setbank, getbank}