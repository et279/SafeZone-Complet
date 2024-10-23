const { generateBuffer } = require('../Funtions/buffer');

const express = require('express');
const SiteType = require('../models/siteType');
const Zone = require('../models/zone');
const router = express.Router();


// Obtener todos los tipos de sitios
router.get('/', async (req, res) => {
  try {
    //console.log('SOLICITUD DE TIPOS DE SITIOS');
    const siteTypes = await SiteType.find();
    res.json(siteTypes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los tipos de sitios' });
  }
});

// Crear un nuevo tipo de sitio
router.post('/', async (req, res) => {
  const { name, radius, restriction } = req.body;
  console.log(name+' - '+radius+' - '+restriction);
  if (!name || !radius || !restriction) {
    console.log('Error faltan campos');
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
    
  }

  const newSiteType = new SiteType({ name, radius, restriction });

  try {
    //console.log('ADICION DE TIPO DE SITIOS');
    const savedSiteType = await newSiteType.save();
    console.log('va guardar un nuevo tipo de sitios');
    res.status(201).json(savedSiteType);
  } catch (err) {
    console.log(err);
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({ error: 'El tipo de sitio ya existe' });
    }
    res.status(500).json({ error: 'Error al guardar el tipo de sitio' });
  }
});


// Actualizar un tipo de sitio y sus zonas asociadas
router.put('/:name', async (req, res) => {
  const { name } = req.params;
  const { radius, restriction } = req.body;

  try {
    //console.log('ACTUALIZACION DE TIPOS DE SITIOS');
    const updatedSiteType = await SiteType.findOneAndUpdate(
      { name },
      { radius, restriction },
      { new: true }
    );

    if (!updatedSiteType) {
      return res.status(404).json({ error: 'Tipo de sitio no encontrado' });
    }

    // Actualizar zonas asociadas si el radio ha cambiado
    if (radius) {
      const zones = await Zone.find({ 'type.name': name });
      zones.forEach(async (zone) => {
        const coordinates = zone.coordinates.map(coord => [coord.lng, coord.lat]);
        const bufferedCoordinates = generateBuffer(coordinates, updatedZone.type.radius);
        zone.coordinatesrestriction = bufferedCoordinates;
        await zone.save();
      });
    }

    res.json(updatedSiteType);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el tipo de sitio' });
  }
});

// Eliminar un tipo de sitio
router.delete('/:name', async (req, res) => {
  const { name } = req.params;

  try {
    //console.log('ELIMINACION DE TIPO DE SITIO');
    const deletedSiteType = await SiteType.findOneAndDelete({ name });
    if (!deletedSiteType) {
      return res.status(404).json({ error: 'Tipo de sitio no encontrado' });
    }
    res.json({ message: 'Tipo de sitio eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el tipo de sitio' });
  }
});

module.exports = router;
