const mongoose = require('mongoose');

const ZoneSchema = new mongoose.Schema({
  name: String,
  coordinates: [
    {
      lat: Number,
      lng: Number,
    },{
      lat: Number,
      lng: Number,
    },
  ],
  radius: Number,
  type: {
    type: String,
    enum: ['Centro Educativo', 'Ludoteca', 'Centro Deportivo', 'Zona Histórica', 'Espacio Público', 'Evento Público', 'Evento Privado','Hospital'],
  },
  restriction: {
    days: [String],
    startHour: String,
    endHour: String,
  },
  coordinatesrestriction: [
    {
      lat: Number,
      lng: Number,
    },{
      lat: Number,
      lng: Number,
    },
  ],
});

module.exports = mongoose.model('Zone', ZoneSchema);

