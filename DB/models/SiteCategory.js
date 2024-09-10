const mongoose = require('mongoose');

const SiteCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  restrictionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restriction',
    required: true,
  },
  version: {
    type: Number,
    default: 1,
  },
  isActive: {
    type: Boolean,
    default: true,
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

module.exports = mongoose.model('SiteCategory', SiteCategorySchema);
