const mongoose = require('mongoose');

const SiteTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Asegurarse de que el campo name sea único y requerido
  radius: { type: Number, required: true },
  restriction: {
    days: { type: [String], required: true },
    startHour: { type: String, required: true },
    endHour: { type: String, required: true },
  },
});

module.exports = mongoose.model('SiteType', SiteTypeSchema);
