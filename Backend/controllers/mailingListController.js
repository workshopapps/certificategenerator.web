const MailingList = require( "../models/mailingListModel")

const { sendMailingEmail } = require("../utils/email")

exports.createMailing = async(req, res, next) =>{
    try {
        const newMail = new MailingList({...req.body})
        await newMail.save()
            .then(result=>{
                // handle mailing list confirmation
                sendMailingEmail(result, res)
            }).catch(err =>{
                console.log(err);
                res.json({status:"FAILED", message:"An error occurred while saving mailing details"})
            })
        // res.status(201).json({response: newMail, message:`New Mailing Created`})

    } catch (err) {
            next(err)
    }
}

exports.getAllMailing = async (req, res) =>{
    const mailings = await MailingList.find({})
    res.status(200).json({response: mailings})
}

exports.DeleteMaling =  async (req, res,next) =>{
        const {id:mailingID} = req.params
        const mailing = await MailingList.findOneAndDelete({_id:mailingID})
        if(!mailing){
            return res.status(404).json(`No Email with id: ${mailingID}`)
        }
            res.status(200).json({response: mailing, message:`Email has been Deleted`})
}

