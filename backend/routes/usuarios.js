const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// POST: Guardar usuario (nuevo o actualizar nombre si ya existe)
router.post('/', async (req, res) => {
  const { email, nombre } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      // Si ya existe, actualizamos nombre si lo envían
      usuario.nombre = nombre || usuario.nombre;
      await usuario.save();
    } else {
      // Si no existe, lo creamos
      usuario = new Usuario({ email, nombre });
      await usuario.save();
    }

    res.status(200).json({ mensaje: 'Usuario guardado/actualizado', usuario });
  } catch (error) {
    console.error("Error al guardar usuario:", error);
    res.status(500).json({ error: 'Error al guardar usuario' });
  }
});

// GET: Obtener usuario por email
router.get('/:email', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.params.email });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar usuario' });
  }
});
// POST: Guardar usuario (nuevo o actualizar nombre si ya existe)
router.post('/', async (req, res) => {
    const { email, nombre } = req.body;
  
    try {
      let usuario = await Usuario.findOne({ email });
  
      if (usuario) {
        usuario.nombre = nombre || usuario.nombre;
        await usuario.save();
      } else {
        usuario = new Usuario({ email, nombre });
        await usuario.save();
      }
  
      res.status(200).json({ mensaje: 'Usuario guardado/actualizado', usuario });
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      res.status(500).json({ error: 'Error al guardar usuario' });
    }
  });

module.exports = router;