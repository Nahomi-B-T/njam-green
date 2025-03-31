const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://melaniesofia:0h0qZodpxgwn7FJ3@njamgreen-cluster.ub7ks.mongodb.net/?retryWrites=true&w=majority&appName=NJAMGREEN-Cluster";

// Conexión a MongoDB Atlas
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error al conectar con MongoDB:", err));

module.exports = mongoose;
