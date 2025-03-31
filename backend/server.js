const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const historialRoutes = require('./routes/historial');
const usuarioRoutes = require('./routes/usuarios');
const sensorRoutes = require('./routes/sensores');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/historial', historialRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/sensores', sensorRoutes);

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error de conexión:', err));

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('🚀 Backend corriendo correctamente');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

