const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  records: [{
    name: {
        type: String,
        required: [true, 'Name of recipient is required']
    },
    nameOfOrganization: {
        type: String,
        required: [true, 'Name of organization (issuer) is required']
    },
    description: {
        type: String,
        required: [true, 'Description (Title) is required']
    },
    award: {
        type: String,
        required: [true, 'Award (purpose) is required']
    },
    signed: {
        type: String,
    },
    email: {
      type: String,
    },
    date: {
        type: String,
        required: [true, 'Date issued is required']
    },
    status: {
      type: String,
      enum: [ 'pending', 'issued', 'canceled' ],
      default: 'pending'
    },
    uuid: {
      type: String
    },
    link: {
      type: String
    }
  }],
  userId:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  subscribed: {
    type: Boolean,
    default: false
  },
  trialAvailable: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('Certificate', CertificateSchema);
