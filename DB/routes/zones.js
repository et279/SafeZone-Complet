const express = require('express');
const Zone = require('../models/zone');
const router = express.Router();

// Obtener todas las zonas protegidas
router.get('/', async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
