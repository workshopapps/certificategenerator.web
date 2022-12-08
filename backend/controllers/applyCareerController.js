const {handleAsync, handleError,handleResponse,createApiError} = require("../utils/helpers")
const ApplyCareer = require( "../models/ApplycareerModel")
const { sendApplicationEmail } = require("../utils/email")

exports.newApplication = handleAsync(async(req, res, next) =>{
  
        const newCareer = new ApplyCareer({...req.body})
        await newCareer.save()
            .then(result=>{
            // handle application  confirmation
                sendApplicationEmail(result, res)
            }).catch(err =>{
                // console.log(err);
                throw createApiError("An error occurred while sending application  confirmation mail", 404)
            })
  
})

exports.getAllApplication  = handleAsync(async (req, res) =>{
    const apply = await ApplyCareer.find({})
    res
    .status(200)
    .json(handleResponse({apply}));
})

exports.getApplication  =  handleAsync(async (req, res, next) =>{
        const {id:applyID} = req.params
        const apply = await ApplyCareer.findOne({_id:applyID})

        if(!apply) throw createApiError(`No Application with id: ${applyID}`, 404);

        res
        .status(200)
        .json(handleResponse({ apply }));
})

exports.DeleteApplication  =  handleAsync(async (req, res,next) =>{
        const {id:applyID} = req.params
        const apply = await ApplyCareer.findOneAndDelete({_id:applyID})

        if(!apply) throw createApiError(`No Application with id: ${applyID}`, 404);

        res
        .status(200)
        .json(handleResponse({ apply },`Application has been Deleted`));

})
