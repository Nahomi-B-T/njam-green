const express = require('express');
const axios = require('axios'); // para conectar con el ESP32
const router = express.Router();

// Cambia esta IP por la IP real de tu ESP32
const IP_ESP32 = 'http://192.168.1.50';

// 🔓 ABRIR
router.post('/abrir', async (req, res) => {
  const { tipo } = req.body;
  console.log(`🔓 Abrir compuerta: ${tipo}`);

  try {
    const response = await axios.get(`${IP_ESP32}/abrir?tipo=${tipo}`);
    res.json({ exito: true, respuesta: response.data });
  } catch (error) {
    console.error('❌ Error al abrir:', error.message);
    res.status(500).json({ exito: false });
  }
});

// 🔒 CERRAR
router.post('/cerrar', async (req, res) => {
  const { tipo } = req.body;
  console.log(`🔒 Cerrar compuerta: ${tipo}`);

  try {
    const response = await axios.get(`${IP_ESP32}/cerrar?tipo=${tipo}`);
    res.json({ exito: true, respuesta: response.data });
  } catch (error) {
    console.error('❌ Error al cerrar:', error.message);
    res.status(500).json({ exito: false });
  }
});

// 🔬 ANALIZAR
router.post('/analizar', async (req, res) => {
  const { tipo } = req.body;
  console.log(`🔬 Analizar desecho: ${tipo}`);

  try {
    const response = await axios.get(`${IP_ESP32}/analizar?tipo=${tipo}`);
    res.json({ exito: true, respuesta: response.data });
  } catch (error) {
    console.error('❌ Error al analizar:', error.message);
    res.status(500).json({ exito: false });
  }
});

module.exports = router;
