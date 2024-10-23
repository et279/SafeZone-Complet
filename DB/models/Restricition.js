const mongoose = require('mongoose');

const RestrictionSchema = new mongoose.Schema({
  radius: {
    type: Number,
    required: true,
  },
  daysApplicable: [
    {
      type: String,
    },
  ],
  timeRange: {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Restriction', RestrictionSchema);
