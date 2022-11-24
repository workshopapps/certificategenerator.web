/* eslint-disable linebreak-style */
const { Router } = require("express");
const { body } = require("express-validator");
const controller = require("../controllers/teamController");

const router = Router();

router
  .get("/", controller.getTeamMembers)
  .get("/:id", controller.getTeamMember)
  .post(
    "/",
    body("email").isEmail().normalizeEmail(),
    body("name").not().isEmpty().trim().escape(),
    controller.addTeamMember
  )
  .put("/:id", controller.updateTeamMember)
  .delete("/:id", controller.deleteTeamMember);

module.exports = router;
