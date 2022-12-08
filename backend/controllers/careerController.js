const {handleAsync, handleError,handleResponse,createApiError} = require("../utils/helpers")
const Career = require( "../models/careerModel")

exports.createCareer = handleAsync(async(req, res, next) =>{
 
        const newCareer = new Career({...req.body})
        await newCareer.save()
        // res.status(201).json({response: newCareer, message:`New Career Created`})
        if(!newCareer) throw createApiError(`Unable to create Career`, 404);

        res
        .status(200)
        .json(handleResponse({newCareer},`New Career Created`));
})

exports.getAllCareer = handleAsync(async (req, res) =>{
    const careers = await Career.find({})
    // res.status(200).json({response: careers})
    if(!careers) throw createApiError(`Unable to get Career`, 404);
    res
    .status(200)
    .json(handleResponse({careers}));
})

exports.getCareer =  handleAsync(async (req, res, next) =>{
        const {id:careerID} = req.params
        const career = await Career.findOne({_id:careerID})
        // if(!career){
        //    return res.status(404).json(`No Career with id: ${careerID}`)
        // }
            // res.status(200).json({response:career})
            if(!career) throw createApiError(`No Career with id: ${careerID}`, 404);
            
            res
            .status(200)
            .json(handleResponse({career}));   
})

exports.DeleteCareer =  handleAsync(async (req, res,next) =>{
        const {id:careerID} = req.params
        const career = await Career.findOneAndDelete({_id:careerID})

        if(!career) throw createApiError(`No Career with id: ${careerID}`, 404);
        res
        .status(200)
        .json(handleResponse({career},"Career has been Deleted")); 
})

exports.updateCareer =  handleAsync(async (req, res, next) =>{
        const {id:careerID} = req.params
        const career = await Career.findOneAndUpdate({_id:careerID},req.body,{
            new:true,
            runValidator:true
        })
        if(!career) throw createApiError(`No Career with id: ${careerID}`, 404);     
        res
        .status(200)
        .json(handleResponse({career},`Career Info Updated`)); 
})

