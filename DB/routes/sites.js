const express = require('express');
const { generateBuffer } = require('../Funtions/buffer');
const turf = require('@turf/turf'); // Asegúrate de que @turf/turf esté instalado
const router = express.Router();
const Site = require('../models/Site');

// Endpoint para crear un nuevo sitio
router.post('/ns', async (req, res) => {
  const site = new Site({
    name: req.body.name,
    coordinates: req.body.coordinates,
    type: req.body.type,
    coordinatesrestriction: req.body.coordinatesrestriction,
  });

  try {
    // Generar el buffer automáticamente
    const coordinates = newSite.coordinates.map(coord => [coord.lng, coord.lat]);
    const bufferedCoordinates = generateBuffer(coordinates, newZone.type.radius);
    newZone.coordinatesrestriction = bufferedCoordinates;
    const site = new Site(req.body);
    await site.save();
    res.status(201).json(site);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos los sitios
router.get('/allsites', async (req, res) => {
  try {
    const sites = await Site.find().populate('siteTypeId restrictionId');
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un sitio por ID
router.get('/:id', async (req, res) => {
  try {
    const site = await Site.findById(req.params.id).populate('siteTypeId restrictionId');
    if (!site) return res.status(404).json({ message: 'Site not found' });
    res.json(site);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un sitio
router.put('/:id', async (req, res) => {
  try {
    const site = await Site.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!site) return res.status(404).json({ message: 'Site not found' });
    res.json(site);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un sitio
router.delete('/:id', async (req, res) => {
  try {
    const site = await Site.findByIdAndDelete(req.params.id);
    if (!site) return res.status(404).json({ message: 'Site not found' });
    res.json({ message: 'Site deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
