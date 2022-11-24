/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const { validationResult } = require("express-validator");
const Member = require("../models/Member");

// get list of all team members with optional stack query
exports.getTeamMembers = async (req, res, next) => {
  try {
    const { stack } = req.query;
    if (stack) {
      Member.find({ stack }, "role avatar email name stack", (err, team) => {
        if (err) {
          next(err);
        }
        if (team.length === 0) {
          return res.status(404).json({
            success: false,
            message: "not found",
          });
        }
        res.status(200).json(team);
      });
    } else {
      Member.find({}, "role avatar team email name stack", (err, team) => {
        if (err) {
          next(err);
        }
        res.status(200).json(team);
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid request",
    });
    console.log(error);
  }
  //   next(error);
  // }
};

// get a team member using a unique identifier
exports.getTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(
      id,
      "role avatar email team name stack"
    );
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "member not found",
      });
    }
    res.status(200).json(member);
  } catch (error) {
    next(error);
  }
};

exports.addTeamMember = async (req, res, next) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json({
      success: true,
      message: "Member added successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "bad request",
    });
  }
};
// try {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const {
//     body,
//   } = req;
//   const member = await new Member(body).save();
//   if (!member) {
//     return res.status(400).json({
//       success: false,
//       message: 'bad request',
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: 'member added successfully',
//     id: member._id,
//   });
// } catch (error) {
//   next(error);
// }
//};

exports.updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    Member.findByIdAndUpdate(id, body, (err) => {
      if (err) {
        next(err);
      }
      res.status(200).json({
        success: true,
        message: "updated successfully",
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const member = await Member.findByIdAndDelete(id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "member not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "member deleted successfully",
      id: member._id,
    });
  } catch (error) {
    next(error);
  }
};
