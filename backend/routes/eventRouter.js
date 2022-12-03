const router = require("express").Router();
const controller = require("../controllers/eventController");
const authentication = require("../middleware/authentication");

router.get("/", authentication, controller.getAllEvents);
router.get("/:eventId", controller.getEventById);
router.post("/", authentication, controller.createEvent);
router.post("/CustomURI", controller.validateCustomURI);
router.post("/:eventId/certificates", controller.getCertificateByEmail);
router.patch("/:eventId", authentication, controller.editEvent);
router.delete("/:eventId", authentication, controller.deleteEvent);

module.exports = router;
