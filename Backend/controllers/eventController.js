require("dotenv").config();
const Event = require("../models/eventModel");
const mongoose = require("mongoose");
const Certificate = require("../models/certificateModel");
const Joi = require("joi");
const { buildEventLink } = require("../utils/helpers");

const getAllEvents = async (req, res) => {
  try {
    // Get logged in user from req.user via auth middleware
    const user = req.user;

    // Get all events by this user
    const events = await Event.find({ userId: user._id }).select([
      "title",
      "customURI",
    ]);

    res.status(200).json({ events, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const query = {};

    if (mongoose.isValidObjectId(eventId)) {
      // build query where to return events where _id or customURI is eventId
      query.$or = [{ customURI: eventId }, { _id: eventId }];
    } else {
      // build query to find event with customURI of eventId
      query.customURI = eventId;
    }

    // Get the event whose _id or customURI  is "eventId"
    // this allows users to use a customURI for their events
    const event = await Event.findOne(query).select(["title", "customURI"]);

    // 404 event not found
    if (!event)
      return res
        .status(404)
        .json({ message: "Event Not Found", success: false });

    res.status(200).json({ event, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const createEvent = async (req, res) => {
  try {
    const user = req.user;
    const { customURI } = req.body;

    // Define validation schema
    const schema = Joi.object({
      title: Joi.string().required(),
      customURI: Joi.string().alphanum(),
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);

    // Validation error
    if (error)
      return res.status(400).json({ message: error.message, success: false });

    // Get certificate collection owned by user
    const certCollection = await Certificate.findOne({
      userId: user._id,
    });

    // Verify that certification collection exists
    if (!certCollection)
      return res.status(400).json({
        message: "user has no certificates",
        success: false,
      });

    // Verify that custom URI isn't taken
    const existingEvent = await Event.findOne({ customURI });

    if (existingEvent)
      return res
        .status(400)
        .json({ message: "customURI is already taken", success: false });

    // Create new event
    const event = await Event.create({ ...req.body, userId: user._id });

    res.status(201).json({ event, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const user = req.user;
    const { eventId } = req.params;

    // 404 is returned even though id is invalid for security sake
    if (!mongoose.isValidObjectId(eventId))
      return res
        .status(404)
        .json({ message: "Resource Not Found", success: false });

    // Get the event with an id of "eventId"
    const event = await Event.findOne({ _id: eventId, userId: user._id });

    // 404 event not found
    if (!event)
      return res
        .status(404)
        .json({ message: "Event Not Found", success: false });

    // Delete event
    await event.deleteOne();

    res.status(200).json({ deleted: event._id, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const editEvent = async (req, res) => {
  try {
    const user = req.user;
    const { eventId } = req.params;

    //Validate eventId, 404 is returned even though id is invalid for security sake
    if (!mongoose.isValidObjectId(eventId))
      return res
        .status(404)
        .json({ message: "Resource Not Found", success: false });

    // Get the event with an id of "eventId" owned by user
    const event = await Event.findOne({ _id: eventId, userId: user._id });

    // 404 event not found
    if (!event)
      return res
        .status(404)
        .json({ message: "Event Not Found", success: false });

    // Define validation schema
    const schema = Joi.object({
      title: Joi.string(),
      customURI: Joi.string().alphanum(),
    });

    // Validate request body
    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).json({ message: error.message, success: false });

    // Delete event
    await event.updateOne(req.body, { new: true });

    res.status(200).json({ event, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getCertificateByEmail = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { email } = req.body;
    const query = {};

    // Email is required
    if (!email)
      return res
        .status(400)
        .json({ message: "Email is required", success: false });

    // Generate query
    if (mongoose.isValidObjectId(eventId)) {
      // build query where to return events where _id or customURI is eventId
      query.$or = [{ customURI: eventId }, { _id: eventId }];
    } else {
      // build query to find event with customURI of eventId
      query.customURI = eventId;
    }

    // Get the event whose _id or customURI  is "eventId"
    const event = await Event.findOne(query);

    // 404 event not found
    if (!event)
      return res
        .status(404)
        .json({ message: "Event Not Found", success: false });

    // Get certificates for this event
    const collection = await Certificate.findOne({ userId: event.userId });

    if (!collection)
      return res
        .status(404)
        .json({ message: "certificate collection Not Found", success: false });

    // Get single certificate with user email
    const certificate = collection.records.find((record) => {
      return record.email === email;
    });

    if (!certificate)
      return res
        .status(404)
        .json({ message: "Certificate Not Found", success: false });

    res.status(200).json({ certificate, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const validateCustomURI = async (req, res) => {
  try {
    const { customURI } = req.body;

    // Define validation schema
    const schema = Joi.string().required().alphanum();

    // Validate customURI against schema
    const { error } = schema.validate(customURI);

    if (error)
      return res.status(400).json({ message: error.message, success: false });

    // Check if customURI is unique
    const eventWithURI = await Event.findOne({ customURI });

    // if customURI is taken
    if (eventWithURI)
      return res
        .status(400)
        .json({ message: "customURI is already taken", success: false });

    res.status(200).json({ customURI, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  deleteEvent,
  createEvent,
  editEvent,
  getCertificateByEmail,
  validateCustomURI,
};
