const activitySchema = require("../model/activity.modal")


async function getActivity(req, res) {
  try {
    const getContract = await activitySchema.findOne({ username: req.query.username })
    if (!getContract) return res.status(200).send("Contract does not Exist")
    return res.status(201).send(getContract);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" })
  }
}
async function setActivity(req, res) {
  try {
    let getactivity = await activitySchema.findOne({ username: req.body.username })
    if (!getactivity) {
      const newactivity = new activitySchema(req.body)
      await newactivity.save()
      res.status(201).send({ message: "Contract Created Sucessfully", success: true });
    }
    else{
      
    }

  } catch (error) {
    res.status(500).send({
      message: `Internal server error ${error}`,
      success: false,
    });
  }
}

async function updateActivity(req,res){
  try {
    let getactivity = await activitySchema.findOne({ username: req.body.username })
    if(!getactivity){
      res.status(200).send("user does not Exist") 
    }
    else{
      activitySchema.updateOne({username: req.body.username}, req.body).then((result)=>{
        res.status(201).send("Record Updated");
      }).catch((error)=>{
        res.status(404).send(error);
      })
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" }); 
  }
}

module.exports = { getActivity, setActivity, updateActivity } 