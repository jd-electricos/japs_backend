const transporter = require("../config/nodemailerConfig");
const transporterOutlook = require("../config/outlookNodeMailerConfig");
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
const sendEmailPays = async (req, res) => {
  console.log('entra a jennifer')
  //funcion que envia el email
  const {
    name,
    company,
    phone,
    email,
    affair,
    message,
    status,
    price,
    reference,
  } = req.body;
  const mailOptions = {
    from: process.env.FROM,
    to: process.env.TOPAY,
    subject: `Nuevo mensaje de ${affair}`,
    text: message,
    html: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Empresa:</strong> ${company}</p><p><strong>Teléfono:</strong> ${phone}</p><p><strong>Email:</strong> ${email}</p><p><strong>Asunto:</strong> ${affair}</p><p><strong>Mensaje:</strong><br>${message}</p>`,
  };
  try {
    // Guarda el mensaje en la base de datos
    await Email.create({ name, company, phone, email, affair, message });
    await transporter.sendMail(mailOptions);

    // 👇 Notificación al cliente

    await notifyClientPaymentStatus({
      name,
      email,
      status,
      price,
      reference,
    });

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

// funcion para notificar al cliente
const notifyClientPaymentStatus = async ({
  name,
  email,
  status,
  reference,
  price,
}) => {
  console.log('entra a clientes')
  const isApproved = status === "APPROVED";

  const bannerUrl = isApproved
    ? "https://ik.imagekit.io/ftuu3w4hn/aprobado.webp"
    : "https://ik.imagekit.io/ftuu3w4hn/rechazado.webp";

  const mailOptions = {
    from: `"JD Eléctricos" <${process.env.OUTLOOK_USER}>`,
    to: email,
    subject: isApproved ? "Pago aprobado ✅" : "Pago no aprobado ❌",
    html: `
      <div style="font-family: Arial, sans-serif; color:#333; line-height:1.5;">
        
        <!-- Banner -->
        <div style="text-align:center; margin-bottom:20px;">
          <img src="${bannerUrl}" 
               alt="Estado del pago" 
               style="max-width:100%; height:auto;" />
        </div>

        <p>Hola ${name},</p>

        ${
          isApproved
            ? `
              <p>Tu pago fue aprobado correctamente.</p>
              <p><strong>Referencia:</strong> ${reference}</p>
              <p><strong>Valor:</strong> $${price}</p>
            `
            : `
              <p>Tu pago no fue aprobado.</p>
              <p>Puedes intentarlo nuevamente.</p>
            `
        }

        <p>Gracias por tu compra.</p>

        <!-- Firma -->
        <div style="
          display:flex;
          align-items:center;
          margin-top:30px;
          padding-top:15px;
          border-top:2px solid #eee;
        ">
          <img
            src="https://ik.imagekit.io/ftuu3w4hn/cards-home/firma-imagen.png"
            width="180"
            alt="Logo JD Eléctricos"
            style="margin-right:20px;"
          />
          <div style="font-size:14px;">
            <b>Notificaciones JD Eléctricos</b><br />
            <i>Área Sistemas</i><br />
            <b>J.D Eléctricos e Industria.</b><br /><br />
            📞 <b>PBX:</b> (1) 341 10 60<br /><br />
            🏢 <b>Dirección:</b><br />
            Carrera 12 # 15-95, Ofc 506<br />
            Bogotá - Colombia<br /><br />
            🌐 <b>Sitios web:</b><br />
            <a href="http://www.jdelectricos.com.co/" style="color:#0563c1; text-decoration:none;">
              www.jdelectricos.com.co
            </a><br />
            <a href="http://www.japs.com.co/" style="color:#0563c1; text-decoration:none;">
              www.japs.com.co
            </a>
          </div>
        </div>

      </div>
    `,
  };

  await transporterOutlook.sendMail(mailOptions);
};

module.exports = { sendEmail, getAllEmails, sendEmailPays };
