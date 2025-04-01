const mongoose = require('mongoose');

const historialSchema = new mongoose.Schema({
  tipo_material: { type: String, required: true },
  tipo: { type: String, required: true }, // IN o OR
  fecha: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Historial', historialSchema);
