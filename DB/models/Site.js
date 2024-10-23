const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coordinates: [
    {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  ],
  siteTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SiteType',
    required: true,
  },
  restrictionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restriction',
  },
  useCustomRestriction: {
    type: Boolean,
    default: false,
  },
  coordinatesRestriction: [
    {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
});

module.exports = mongoose.model('Site', SiteSchema);

