const User = require("../models/userModel");


const updateUserPlan = async (req, res) => {
  const { 
    body: { plan }, 
    params: { id } } = req
    if(!plan || !id) {
        return res.status(400).json({ "error": "All fields are required"})
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(403).json({ error: "Not a valid user ID" });
      }
  const foundUser = await User.findById(id).exec()
  if (!foundUser) {
      return res.status(400).json({ message: `No user found with id ${id}`})
  }
  foundUser.subscription = plan
  const update = await foundUser.save()
  res.status(200).json({ update })
}



module.exports = {
    updateUserPlan,
}