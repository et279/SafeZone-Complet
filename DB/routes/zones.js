const express = require('express');
const Zone = require('../models/zone');
const router = express.Router();
const turf = require('@turf/turf'); // Asegúrate de que @turf/turf esté instalado


// Obtener todas las zonas protegidas
router.get('/', async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Ruta para guardar o actualizar el buffer de una zona
router.post('/save-restriction-coordinates/:id', async (req, res) => {
  const { id } = req.params;
  const { restrictionCoordinates } = req.body;

  if (!restrictionCoordinates || !Array.isArray(restrictionCoordinates)) {
    return res.status(400).json({ error: 'Coordenadas de restricción inválidas' });
  }

  try {
    const zone = await Zone.findById(id);

    if (!zone) {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }

    // Guardar las coordenadas del buffer directamente
    const bufferedCoordinates = restrictionCoordinates.map(coord => ({
      lat: coord.lat,
      lng: coord.lng,
    }));

    // Actualizar el buffer en la zona
    zone.coordinatesrestriction = bufferedCoordinates;

    await zone.save();
    res.status(200).json({ message: 'Coordenadas de restricción guardadas con éxito', zone });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//endpoint para actualizas los sitios
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedZone = await Zone.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedZone) {
      return res.status(404).send('Zona no encontrada');
    }
    res.status(200).send(`Zona con ID ${id} actualizada`);
  } catch (error) {
    res.status(500).send('Error actualizando la zona');
  }
});

// Endpoint para generar y enviar el perímetro sin guardarlo
router.post('/generate-perimeter/:id', async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);
    if (!zone) {
      return res.status(404).send('Zone not found');
    }
    
    const coordinates = zone.coordinates.map(coord => [coord.lng, coord.lat]);
    
    // Asegúrese de que el polígono está cerrado añadiendo el primer punto al final si no está ya presente
    if (coordinates[0][0] !== coordinates[coordinates.length - 1][0] || coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
      coordinates.push(coordinates[0]);
    }
    const polygon = turf.polygon([coordinates]);
    console.log(polygon);
    const buffered = turf.buffer(polygon, zone.radius, { units: 'meters' });
    

    const bufferedCoordinates = buffered.geometry.coordinates[0].map(coord => ({
      lat: coord[1],
      lng: coord[0],
    }));
    console.log(bufferedCoordinates);
    res.status(200).json({ zone, bufferedCoordinates });
  } catch (error) {
    console.error('Error generating perimeter:', error);
    res.status(500).send(error.message);
  }
});

// Endpoint para guardar el perímetro aprobado
router.post('/approve-perimeter/:id', async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);
    if (!zone) {
      return res.status(404).send('Zone not found');
    }

    zone.coordinatesrestriction = req.body.bufferedCoordinates;
    await zone.save();

    res.status(200).send(zone);
  } catch (error) {
    console.error('Error saving perimeter:', error);
    res.status(500).send(error.message);
  }
});

// Crear una nueva zona protegida
router.post('/', async (req, res) => {
  const zone = new Zone({
    name: req.body.name,
    coordinates: req.body.coordinates,
    radius: req.body.radius,
    type: req.body.type,
    restriction: req.body.restriction,
    coordinatesrestriction: req.body.coordinatesrestriction,
  });

  try {
    const newZone = await zone.save();
    res.status(201).json(newZone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
