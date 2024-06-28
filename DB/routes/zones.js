const { generateBuffer } = require('../Funtions/buffer');
const express = require('express');
const Zone = require('../models/zone');
const router = express.Router();
const turf = require('@turf/turf'); // Asegúrate de que @turf/turf esté instalado


// Endpoint para solicitar todas las zonas protegidas
router.get('/', async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// endpoint para guardar o actualizar el buffer de una zona
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
// Endpoint para crear una nueva zona protegida
router.post('/', async (req, res) => {
  const zone = new Zone({
    name: req.body.name,
    coordinates: req.body.coordinates,
    type: req.body.type,
    coordinatesrestriction: req.body.coordinatesrestriction,
  });

  console.log(zone.coordinates);
  try {
    const newZone = await zone.save();

    // Generar el buffer automáticamente
    const coordinates = newZone.coordinates.map(coord => [coord.lng, coord.lat]);
    const bufferedCoordinates = generateBuffer(coordinates, newZone.type.radius);
    newZone.coordinatesrestriction = bufferedCoordinates;
    await newZone.save();
    res.status(201).json(newZone);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
    console.log('Se esta actualizando '+id);
    // Generar el buffer automáticamente
    const coordinates = updatedZone.coordinates.map(coord => [coord.lng, coord.lat]);
    const bufferedCoordinates = generateBuffer(coordinates, updatedZone.type.radius);
    updatedZone.coordinatesrestriction = bufferedCoordinates;
    await updatedZone.save();

    res.status(200).send(`Zona con ID ${id} actualizada`);
  } catch (error) {
    res.status(500).send('Error actualizando la zona');
  }
});


module.exports = router;
