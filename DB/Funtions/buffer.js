
const turf = require('@turf/turf');

// Función para generar el buffer
const generateBuffer = (coordinates, radius) => {
    console.log('Se van a crear buffer');
    if (coordinates.length > 0) {
      // Verificar si el polígono está cerrado y cerrarlo si es necesario
      if (coordinates[0][0] !== coordinates[coordinates.length - 1][0] || coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
        coordinates.push(coordinates[0]);
      }
    }
    const polygon = turf.polygon([coordinates]);
    const buffered = turf.buffer(polygon, radius, { units: 'meters' });
  
    if (buffered && buffered.geometry && buffered.geometry.coordinates[0]) {
      return buffered.geometry.coordinates[0].map(coord => ({
        lat: coord[1],
        lng: coord[0],
      }));
    }
    throw new Error('Error generating buffer');
  };
  
  module.exports = { generateBuffer };