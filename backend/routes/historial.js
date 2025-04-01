const express = require('express');
const router = express.Router();
const SensorRegistro = require('../models/SensorRegistro');

// Leer registros desde la colección real test.sensors
router.get('/', async (req, res) => {
  try {
    const datos = await SensorRegistro.find().sort({ fecha: -1 }).limit(50); // últimos 50
    res.json(datos);
  } catch (err) {
    console.error('❌ Error al obtener historial desde test.sensors:', err);
    res.status(500).json({ error: 'Error al obtener historial desde sensores' });
  }
});

module.exports = router;