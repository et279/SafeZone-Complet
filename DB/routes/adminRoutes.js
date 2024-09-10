const express = require('express');
const router = express.Router();
const { generateBuffer } = require('../functions/buffer');
const Site = require('../models/Site');
const SiteType = require('../models/SiteType');
const Restriction = require('../models/Restriction');
const RestrictionHistory = require('../models/RestrictionHistory');
const SiteCategory = require('../models/SiteCategory');
const turf = require('@turf/turf');

// Middleware para validar permisos de administrador
const adminAuth = (req, res, next) => {
  // Aquí puedes implementar la lógica de validación de permisos
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Permiso denegado' });
  }
};

// Endpoint para crear un nuevo sitio (sólo administradores)
router.post('/sites', adminAuth, async (req, res) => {
try {
    const { name, coordinates, siteType, siteCategory, restriction } = req.body;

    const site = new Site({
      name,
      coordinates,
      siteType,
      siteCategory,
      restriction,
    });

    // Guardar el nuevo sitio
    const newSite = await site.save();

    // Generar buffer y guardar en el sitio
    const bufferedCoordinates = generateBuffer(coordinates, siteType.radius);
    newSite.restriction = {
      ...restriction,
      coordinatesRestriction: bufferedCoordinates,
    };
    await newSite.save();


    res.status(201).json(newSite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint para actualizar un sitio (sólo administradores)
router.put('/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedSite = await Site.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedSite) {
      return res.status(404).send('Sitio no encontrado');
    }

    // Generar el buffer automáticamente si se actualizan las coordenadas y el radio
    if (updatedSite.coordinates && updatedSite.type.radius) {
      const coordinates = updatedSite.coordinates.map(coord => [coord.lng, coord.lat]);
      const bufferedCoordinates = generateBuffer(coordinates, updatedSite.type.radius);
      updatedSite.coordinatesrestriction = bufferedCoordinates;
      await updatedSite.save();
    }

    res.status(200).send(`Sitio con ID ${id} actualizado`);
  } catch (error) {
    res.status(500).send('Error actualizando el sitio');
  }
});

// Otros endpoints de administración...

module.exports = router;
