const ApplyCareer = require( "../models/ApplycareerModel")

const { sendApplicationEmail } = require("../utils/email")

exports.newApplication = async(req, res, next) =>{
    try {
        const newCareer = new ApplyCareer({...req.body})
        await newCareer.save()
            .then(result=>{
            // handle application  confirmation
                sendApplicationEmail(result, res)
            }).catch(err =>{
                console.log(err);
                res.json({status:"FAILED", message:"An error occurred while sending application  confirmation mail"})
            })
    } catch (err) {
            next(err)
    }
}

exports.getAllApplication  = async (req, res) =>{
    const apply = await ApplyCareer.find({})
    res.status(200).json({response: apply})
}

exports.getApplication  =  async (req, res, next) =>{
        const {id:applyID} = req.params
        const apply = await ApplyCareer.findOne({_id:applyID})

        if(!apply){
           return res.status(404).json(`No Application with id: ${applyID}`)
        }
            res.status(200).json({response:apply})
}

exports.DeleteApplication  =  async (req, res,next) =>{
        const {id:applyID} = req.params
        const apply = await ApplyCareer.findOneAndDelete({_id:applyID})

        if(!apply){
            return res.status(404).json(`No Application with id: ${applyID}`)
        }
            res.status(200).json({response: apply, message:`Application has been Deleted`})
}
