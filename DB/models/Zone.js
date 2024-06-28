const mongoose = require('mongoose');

const ZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coordinates: [
    {
      lat: Number,
      lng: Number,
    },
  ],
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SiteType',
    required: true,
  },
  coordinatesrestriction: [
    {
      lat: Number,
      lng: Number,
    },
  ],
});

module.exports = mongoose.model('Zone', ZoneSchema);
