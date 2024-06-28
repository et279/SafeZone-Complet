const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
// Configurar CORS para permitir solicitudes desde varios orígenes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Rutas
const zonesRouter = require('./routes/zones');
const siteTypesRouter = require('./routes/siteTypes');
app.use('/zones', zonesRouter);
app.use('/site-types', siteTypesRouter);

// Ruta Test
app.get('/', (req, res) => {
  res.send('Hello World');
});
// Inicio del servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
