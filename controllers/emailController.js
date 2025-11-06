const transporter = require("../config/nodemailerConfig");
const Email = require("../models/email");
const sendEmail = async (req, res) => {
  //funcion que envia el email
  const { name, company, phone, email, affair, message } = req.body;
  const mailOptions = {
    from: process.env.FROM,
    to: process.env.TO,
    subject: `Nuevo mensaje de ${name} - ${affair}`,
    text: message,
    html: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Empresa:</strong> ${company}</p><p><strong>Teléfono:</strong> ${phone}</p><p><strong>Email:</strong> ${email}</p><p><strong>Asunto:</strong> ${affair}</p><p><strong>Mensaje:</strong><br>${message}</p>`,
  };
  try {
    // Guarda el mensaje en la base de datos
    await Email.create({ name, company, phone, email, affair, message });
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
};
/**
 * Obtiene todos los producto
 *
 * @param {Object} req - La solicitud del cliente.
 * @param {Object} res - La respuesta al cliente.
 */
const getAllEmails = async (req, res) => {
  try {
    // Obtiene todos los productos
    const email = await Email.findAll();
    res.status(200).json({ email });
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};
module.exports = { sendEmail, getAllEmails };