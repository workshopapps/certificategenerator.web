const Plan = require("../models/pricingModel")


const getAllPlans = async (req, res) => {
    const plans = await Plan.find()
    if (!plans?.length) {
        return res.status(200).json({ message: "There are no plans" })
    }
    res.status(200).json({ plans })
}
const createPlan = async (req, res) => {
    const { price, type, description } = req.body
    if (!price || !type || !description) {
        return res.status(400).json({ message: "All fields are required"})
    }
    const plan = await Plan.create({ price, type, description })
    if (plan) {
        return res.status(201).json({ plan })
    } else {
        return res.status(400).json({ message: "Invalid information"})
    }
}

const getPlan = async (req, res) => {
    const { id } = req.params
    const foundPlan = await Plan.findById(id).exec()
    if(!foundPlan) throw new unAuth(`No plan found with ID ${id}`)
    res.status(200).json({ foundPlan })
}

const updatePlan = async (req, res) => {
    const { 
        body: { type, price, description }, 
        params: { id } } = req


    if(!price || !type || !description || !id) {
        return res.status(400).json({ "error": "All fields are required"})
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

const deletePlan = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: "An id should be provided"})
    }
    const foundPlan = await Plan.findById(id).exec()
    if(!foundPlan) {
        return res.status(400).json({ "error": `No job found with ID ${id}` })
    }
    await Plan.deleteOne({ _id: id })
    res.status(204).json({ "msg" : `Plan with Id ${id} deleted`})
}

module.exports = {
    getAllPlans,
    createPlan,
    getPlan,
    updatePlan,
    deletePlan
  }