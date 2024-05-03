const recalCulatedPolicySchema = require('../model/policy.modal')



async function getPolicy(req, res) {
    try {
        let policystatus = await recalCulatedPolicySchema.findOne({ username: req.query.username })
        if (!policystatus) return res.status(200).send("Policy does not Exist")
        return res.status(201).send(policystatus)
    } catch (error) {
        res.status(500).send({
            message: `Internal server error ${error}`,
            success: false,
        });
    }
}
async function setPolicy(req, res) {
    try {
        const newpolicy = new recalCulatedPolicySchema(req.body)
        await newpolicy.save()
        res.status(201).send({ message: "Re caluclated policy Sucessfully", success: true });

    } catch (error) {
        res.status(500).send({
            message: `Internal server error ${error}`,
            success: false,
        });
    }
}


module.exports = {setPolicy, getPolicy}