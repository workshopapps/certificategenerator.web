require("dotenv").config();
const Event = require("../models/eventModel");
const mongoose = require("mongoose");
const Certificate = require("../models/certificateModel");
const Template = require("../models/templateModel");
const Joi = require("joi");
const crypto = require("crypto");
const {
  handleAsync,
  handleResponse,
  createApiError
} = require("../utils/helpers");
const { GenerateCertificatePdfs } = require("../utils/certificate");

const getAllEvents = handleAsync(async (req, res) => {
  // Get logged in user from req.user via auth middleware
  const user = req.user;

  // Get all events by this user
  const events = await Event.find({ userId: user._id }).select([
    "title",
    "customURI"
  ]);

  res.status(200).json(handleResponse({ events }));
});

const getEventById = handleAsync(async (req, res) => {
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
  if (!event) throw createApiError("Event Not Found", 404);

  res.status(200).json(handleResponse({ event }));
});

const createEvent = handleAsync(async (req, res) => {
  const user = req.user;
  const customURI = req.body.customURI || crypto.randomUUID();
  req.body.customURI = customURI;

  // Define validation schema
  const schema = Joi.object({
    title: Joi.string().required(),
    customURI: Joi.string()
      .regex(/^[a-zA-Z0-9\-\_]+$/)
      .required()
  });

  // Validate request body against schema
  const { error } = schema.validate(req.body);

  // Validation error
  if (error) throw createApiError(error.message);

  // Get certificate collection owned by user
  const certCollection = await Certificate.findOne({
    userId: user._id
  });

  // Verify that certification collection exists
  if (!certCollection) throw createApiError("user has no certificates", 400);

  // Verify that custom URI isn't taken
  const existingEvent = await Event.findOne({ customURI });

  if (existingEvent) throw createApiError("customURI is already taken", 400);

  // Create new event
  const event = await Event.create({ ...req.body, userId: user._id });

  res.status(201).json(handleResponse({ event }));
});

const deleteEvent = handleAsync(async (req, res) => {
  const user = req.user;
  const { eventId } = req.params;

  // 404 is returned even though id is invalid for security sake
  if (!mongoose.isValidObjectId(eventId))
    throw createApiError("Resource Not Found", 404);

  // Get the event with an id of "eventId"
  const event = await Event.findOne({ _id: eventId, userId: user._id });

  // 404 event not found
  if (!event) throw createApiError("Event Not Found", 404);

  // Delete event
  await event.deleteOne();

  res.status(200).json(handleResponse({ deleted: event._id }));
});

const editEvent = handleAsync(async (req, res) => {
  const user = req.user;

  const { eventId } = req.params;

  //Validate eventId, 404 is returned even though id is invalid for security sake
  if (!mongoose.isValidObjectId(eventId))
    throw createApiError("Resource Not Found", 404);

  const schema = Joi.object({
    title: Joi.string(),
    customURI: Joi.string().alphanum()
  });

  // Validate request body
  const { error } = schema.validate(req.body);

  if (error) throw createApiError(error.message, 400);

  // Get the event with an id of "eventId" owned by user
  const event = await Event.findOneAndUpdate(
    { _id: eventId, userId: user._id },
    req.body,
    { new: true }
  );

  // 404 event not found
  if (!event) throw createApiError("Event Not Found", 404);

  res.status(200).json(handleResponse({ event }));
});

const getCertificateByEmail = handleAsync(async (req, res) => {
  const { eventId } = req.params;
  const { email, templateId } = req.body;
  const query = {};

  // Email is required
  if (!email) throw createApiError("Email is required", 400);

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
  if (!event) throw createApiError("Event Not Found", 404);

  // Get certificates for this event
  const collection = await Certificate.findOne({ userId: event.userId });

  if (!collection)
    throw createApiError("certificate collection Not Found", 404);

  // Get single certificate with user email
  const certificate = collection.records.find(record => {
    return record.email === email;
  });

  if (!certificate) throw createApiError("Certificate Not Found", 404);

  const template = await Template.findById(templateId);

  if (!template) throw createApiError("Template not found", 400);

  // Convert certificate to PDF
  const pdfPath = await GenerateCertificatePdfs(certificate, template.raw);

  // Send pdf as response
  res.download(pdfPath);
});

const validateCustomURI = handleAsync(async (req, res) => {
  const { customURI } = req.body;

  // Define validation schema
  const schema = Joi.string().required().alphanum();

  // Validate customURI against schema
  const { error } = schema.validate(customURI);

  if (error) throw createApiError(error.message, 400);

  // Check if customURI is unique
  const eventWithURI = await Event.findOne({ customURI });

  // if customURI is taken
  if (eventWithURI) throw createApiError("customURI is already taken", 400);

  res.status(200).json(handleResponse({ customURI }));
});

module.exports = {
  getAllEvents,
  getEventById,
  deleteEvent,
  createEvent,
  editEvent,
  getCertificateByEmail,
  validateCustomURI
};
