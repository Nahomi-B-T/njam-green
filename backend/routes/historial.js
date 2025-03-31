const express = require('express');
const router = express.Router();
const Historial = require('../models/Historial');

// 📌 Obtener todo el historial
router.get('/', async (req, res) => {
  try {
    const historial = await Historial.find();
    res.json(historial);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
});

// 📌 Agregar un nuevo registro de material
router.post('/', async (req, res) => {
  try {
    const nuevoRegistro = new Historial(req.body);
    await nuevoRegistro.save();
    res.status(201).json(nuevoRegistro);
  } catch (err) {
    res.status(400).json({ error: 'Error al guardar el registro' });
  }
});

module.exports = router;
