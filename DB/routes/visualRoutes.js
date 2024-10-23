// Importamos archivos base
const express = require('express');
const router = express.Router();
// Importamos Funciones
const { generateBuffer } = require('../Funtions/buffer');
//Importar Controladores
const siteController = require('../controllers/siteController');

// Endpoint para obtener un test de funcionamiento
router.get('/test', (req, res) => {
  res.send('Este es un texto de prueba desde la API de visualización.');
});
// Endpoint para obtener todos los sitios activos
router.get('/sites/active', siteController.getAllSiteActive);
// Endpoint para obtener todos los sitios inactivos (datos basicos)
router.get('/sites/inactive', siteController.getAllSiteInactive);
// Endpoint para obtener todos los sitios activos (datos basicos)
router.get('/sites/active-full', siteController.getAllSiteActiveFull);
// Endpoint para obtener todos los sitios inactivos (datos basicos)
router.get('/sites/inactive-full', siteController.getAllSiteInctiveFull);

// Otros endpoints de visualización...

module.exports = router;
