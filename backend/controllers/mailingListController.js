const {handleAsync, handleError,handleResponse,createApiError} = require("../utils/helpers")
const MailingList = require( "../models/mailingListModel")

const { sendMailingEmail } = require("../utils/email")

exports.createMailing = handleAsync(async(req, res, next) =>{

        const newMail = new MailingList({...req.body})
        await newMail.save()
            .then(result=>{
                // handle account verification
                sendMailingEmail(result, res)
            }).catch(err =>{
                // console.log(err);
                throw createApiError("An error occurred while saving mailing details", 404)
            })

 
})

exports.getAllMailing = handleAsync(async (req, res) =>{
    const mailings = await MailingList.find({})

    if(!mailings) throw createApiError(`error in getting mailing list`, 404);   
    res
    .status(200)
    .json(handleResponse({mailings})); 
})

exports.DeleteMaling =  handleAsync(async (req, res,next) =>{
        const {id:mailingID} = req.params
        const mailing = await MailingList.findOneAndDelete({_id:mailingID})

        if(!mailing) throw createApiError(`No Email with id`, 404);   
        res
        .status(200)
        .json(handleResponse({mailing},"Email has been Deleted")); 
})

