const Profile = require('../models/profileModel');
const { User } = require('../models/userModel')
const mongoose = require('mongoose');

const createUserProfile = async (req, res, next) => {
    const profile = new Profile({
        user:req.body.user.id,
        name: req.body.name,
        job: req.body.job,
        location: req.body.location,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    });
    await profile.save();
    if (!profile)
        return next( res.status(404).send('profile cannot be created'))

    res.status(201).json({status: 'success', profile});
};

const getUserProfile = async (req, res, next) => {
    const profile = await Profile.findOne({user:req.user.id});
    if (!profile) {
        return next(res.status(404).send("no profile with id"))
    };

    res.status(200).json({profile});
};

const updateUserProfile = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('invalid profile Id')
 
    }
    const updatedProfile = await Profile.findByIdAndUpdate({user:req.user.id},
        {
            user:req.body.user.id,
            name: req.body.name,
            job: req.body.job,
            location: req.body.location,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        },
        { new: true });

    if (!updatedProfile) {
        return next(res.status(404).send("no profile with id)");
    }
    res.status(201).json({updatedProfile});
};


const deleteUserProfile = async (req, res) => {
   
    const profile = await Profile.findByIdAndRemove(user:req.user.id);
   
    if (!profile) return res.status(404).send("There is no profile with given id");
  
    res.send("profile deleted");
  };


module.exports = {
    createUserProfile,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
    
}
