const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');

// 📌 Obtener datos de sensores
router.get('/', async (req, res) => {
  try {
    const sensores = await Sensor.find();
    res.json(sensores);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos de sensores' });
  }
});

// 📌 Guardar nuevos datos de sensores
router.post('/', async (req, res) => {
  try {
    const nuevoDato = new Sensor(req.body);
    await nuevoDato.save();
    res.status(201).json(nuevoDato);
  } catch (err) {
    res.status(400).json({ error: 'Error al guardar datos del sensor' });
  }
});

module.exports = router;
