const mongoose = require('mongoose');

const RestrictionHistorySchema = new mongoose.Schema({
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true,
  },
  restrictionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restriction',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
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

module.exports = mongoose.model('RestrictionHistory', RestrictionHistorySchema);
