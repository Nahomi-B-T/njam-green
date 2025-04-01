const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  peso: Number,
  tipo_de_basura: String,
  fecha: Date
});

module.exports = mongoose.connection.useDb('test').model('SensorRegistro', sensorSchema, 'sensors');
