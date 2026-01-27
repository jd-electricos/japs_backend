// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const helmet = require('helmet');

const productRoutes = require('./routes/productRoutes.js');
const emailRoutes = require('./routes/emailRoutes.js');
const mapsRoutes = require('./routes/mapsRoutes.js');
const postsRoutes = require('./routes/postsRoutes.js')
const recaptchaRoutes = require('./routes/recaptchaRoutes.js')

const sequelize = require('./config/sequelize.js');

const app = express();

// seguridad
// app.use(helmet());

// app.use(cors());
app.use(cors({
  origin: [
    'https://japs.com.co',
    'https://www.japs.com.co',
    'https://jdelectricos.com.co',
    'https://www.jdelectricos.com.co'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

/* 📦 JSON */
app.use(express.json());

// Rutas
// Middleware
app.use('/api/products', productRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/recaptcha', recaptchaRoutes);
app.use('/api/maps', mapsRoutes);
app.use('/api/posts', postsRoutes);

// Sincronizar modelos con la base de datos
sequelize.sync({ alter: false })
  .then(() => console.log('Tablas sincronizadas con éxito'))
  .catch(err => console.error('Error al sincronizar tablas:', err));

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});