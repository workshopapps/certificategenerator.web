const UserPlan = require("../models/pricingPlanModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

const createUserPlan = async (req, res) => {
    const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);

  const { type, price, description } = req.body
  if (!price || !type || !description) {
    return res.status(400).json({ message: "All fields are required"})
    }

    const user = await User.findOne({ userId }).exec();

    if (!user) {
        return res.status(400).json({ message: "User with such id does not exist"})
      } 
    const plan = await UserPlan.create({ price, type, description })
    if (plan) {
        return res.status(201).json({ plan })
    } else {
        return res.status(400).json({ message: "Invalid information"})
    }
}

const getAllUsersPlan = async (req, res) => {
    const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);
  const user = await User.findOne({ userId }).exec();
  if (!user) return res.status(404).json({ message: "user not found" });
  const plans = await Plan.find()
    if (!plans?.length) {
        return res.status(200).json({ message: "There are no plans" })
    }
    res.status(200).json({ plans })
}

const getUserPlan = async (req, res) => {
    const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);

  const user = await User.findOne({ userId });
  if (!user) return res.status(404).json({ message: "user not found" });

  const { id } = req.params
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(403).json({ error: "Not a valid user ID" });
  }

  if (id !== userId) {
    return res.status(400).json({ message: "invalid userid" })
  }
  const foundPlan = await Plan.findById(id).exec()
  if(!foundPlan) throw new unAuth(`No plan found with ID ${id}`)
  res.status(200).json({ foundPlan })
}

const updateUserPlan = async (req, res) => {
    const auth = req.headers.authorization;
  const payload = req.body;
  
  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);

  const user = await User.findOne({ userId });
  if (!user) return res.status(404).json({ message: "user not found" });
  const { 
    body: { type, price, description }, 
    params: { id } } = req
    if(!price || !type || !description || !id) {
        return res.status(400).json({ "error": "All fields are required"})
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(403).json({ error: "Not a valid user ID" });
      }
  if (id !== userId) {
    return res.status(400).json({ message: "invalid userid" })
  }
  const foundPlan = await Plan.findById(id).exec()
  if (!foundPlan) {
      return res.status(400).json({ message: `No plan found with id ${id}`})
  }
  foundPlan.price = price
  foundPlan.type = type
  foundPlan.description = description
  const update = await foundPlan.save()
  res.status(200).json({ update })
}

const deleteUserPlan = async (req, res) => {
    const { id } = req.params


  //validate header authorization
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

   //validate param ID
   if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(403).json({ error: "Not a valid user ID" });
  }
  const foundPlan = await Plan.findById(id).exec()
    if(!foundPlan) {
        return res.status(400).json({ "message": `No plan found with ID ${id}` })
    }
    await Plan.deleteOne({ _id: id })
    res.status(204).json({ "msg" : `Plan with Id ${id} deleted`})
}

module.exports = {
    createUserPlan,
    getAllUsersPlan,
    getUserPlan,
    updateUserPlan,
    deleteUserPlan
}