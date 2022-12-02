const Career = require( "../models/careerModel")

exports.createCareer = async(req, res, next) =>{
    try {
        const newCareer = new Career({...req.body})
        await newCareer.save()
        res.status(201).json({response: newCareer, message:`New Career Created`})
    } catch (err) {
            next(err)
    }
}

exports.getAllCareer = async (req, res) =>{
    const careers = await Career.find({})
    res.status(200).json({response: careers})
}

exports.getCareer =  async (req, res, next) =>{
        const {id:careerID} = req.params
        const career = await Career.findOne({_id:careerID})

        if(!career){
           return res.status(404).json(`No Career with id: ${careerID}`)
        }
            res.status(200).json({response:career})
}

exports.DeleteCareer =  async (req, res,next) =>{
        const {id:careerID} = req.params
        const career = await Career.findOneAndDelete({_id:careerID})

        if(!Career){
            return res.status(404).json(`No Career with id: ${careerID}`)
        }
            res.status(200).json({response: Career, message:`Career has been Deleted`})
}

exports.updateCareer =  async (req, res, next) =>{
        const {id:careerID} = req.params
        const career = await Career.findOneAndUpdate({_id:careerID},req.body,{
            new:true,
            runValidator:true
        })

        if(!career){
            return res.status(404).json(`No Career with id: ${careerID}`)
        }
        res.status(200).json({response: career, message:`Career Info Updated`})
}

