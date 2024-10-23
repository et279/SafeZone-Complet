const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Salir del proceso si la conexión falla
  });

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Rutas
//const siteTypesRouter = require('./routes/siteTypes');
//const adminRouter = require('./routes/adminRoutes');  // Nueva API para administración
const visualRouter = require('./routes/visualRoutes'); // Nueva API para visualización

//app.use('/api/admin', adminRouter);    // API para administración
app.use('/api/visual', visualRouter);  // API para visualización

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Manejo de errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
