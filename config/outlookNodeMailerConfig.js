const nodemailer = require("nodemailer");

const transporterOutlook = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.OUTLOOK_USER, // notificaciones@tudominio.com
    pass: process.env.OUTLOOK_PASS, // contraseña o app password
  },
});
module.exports = transporterOutlook;
