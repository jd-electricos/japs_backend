const nodemailer = require("nodemailer");

// Configura el transportador de correo
const transporter = nodemailer.createTransport({
  service: "Gmail", // Cambia esto según tu proveedor de correo
  auth: {
    user: process.env.FROM, // Tu dirección de correo
    pass: process.env.SEND_TK, // Tu contraseña o token de aplicación
  },
});
module.exports = transporter;
