const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  peso: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sensor', sensorSchema);
