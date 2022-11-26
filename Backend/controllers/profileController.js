<<<<<<< HEAD
const mongoose = require('mongoose');
const Profile = require('../models/profileModel');
const { User } = require('../models/userModel')



const createUserProfile = async (req, res, next) => {
    const profile = new Profile({
        user:req.bod.user,
        name: req.body.name,
        job: req.body.job,
        location: req.body.location,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
=======
const Profile = require("../models/profileModel");
const jwt = require("jsonwebtoken");

const addUserProfile = async (req, res, next) => {
  const auth = req.headers.authorization;
  const payload = req.body;
  if (!payload) return res.status(400).json({ error: "Bad request" });
  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);

  const user = await Profile.findOne({ user: userId }).exec();

  let userProfile;
  if (!user) {
    userProfile = await Profile.create({
      user: userId,
      name: payload.name,
      job: payload.job,
      location: payload.location,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
>>>>>>> 86ad619ae164b2daf428c9dd9ef3f438e9e60dca
    });
  } else return res.status(400).json({ error: "profile already exist" });

  await userProfile.save();
  res.status(201).json({ result: userProfile });
};

<<<<<<< HEAD
const getUserProfile = async (req, res, next) => {
    const profile = await Profile.findOne({user:req.user.id}).populate('user',['email']);
    if (!profile) {
        return next(res.status(404).send('no profile '))
    };
=======
const getUserProfile = async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }
>>>>>>> 86ad619ae164b2daf428c9dd9ef3f438e9e60dca

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);

  const profile = await Profile.findOne({ user: userId }).exec();

  if (!profile) {
    return next(res.status(404).send("no profile with id")).end();
  }

  res.status(200).json({ profile });
};

const updateUserProfile = async (req, res) => {
<<<<<<< HEAD
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('invalid profile Id')
    }
    const updatedProfile = await Profile.findByIdAndUpdate({user:req.user.id},
        {
            user:req.body.user,
            name: req.body.name,
            job: req.body.job,
            location: req.body.location,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        },
        { new: true });

    if (!updatedProfile) {
        return next(res.status(404).send('no profile id'));
    }
    res.status(201).json({updatedProfile});
};


const deleteUserProfile = async (req, res) => {
    
    const profile = await Profile.findByIdAndRemove({user:req.user.id});
    const user = await User.findByIdAndRemove({_id:req.user.id});
  
    if (!profile) return res.status(404).send('There is no user to delete');
  
    res.status(201).json("profile deleted");
  };


=======
  const payload = req.body;
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" }).end();
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);

  const profile = await Profile.findOne({ user: userId }).exec();

  if (!profile) {
    return next(res.status(404).send("no profile with id")).end();
  }

  profile.name = payload.name;
  profile.job = payload.job;
  profile.location = payload.location;
  profile.email = payload.email;
  profile.phoneNumber = payload.phoneNumber;

  await profile.save();
  res.status(201).json({ result: profile });
};

>>>>>>> 86ad619ae164b2daf428c9dd9ef3f438e9e60dca
module.exports = {
  addUserProfile,
  getUserProfile,
  updateUserProfile,
};
