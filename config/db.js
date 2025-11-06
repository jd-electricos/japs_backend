// /config/db.js
// Importamos el módulo 'pg' para la conexión con PostgreSQL
const { Pool } = require('pg');
// Creamos una instancia de Pool para manejar la conexión con la base de datos
const pool = new Pool({
  // connectionString: process.env.w // Puerto en el que la base de datos está escuchando
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // Esto es necesario si estás usando SSL
  }
});
// Intentamos conectar con la base de datos y manejar errores
pool.connect()
  .then(() => console.log('Conectado a la base de datos PostgreSQL'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));
// Exportamos el pool para usarlo en otras partes de la aplicación
module.exports = pool;