const express = require("express");
const { sendEmail, getAllEmails, sendEmailPays } = require("../controllers/emailController");
const router = express.Router();
// Ruta para enviar correos
router.post("/send-email", sendEmail);
// ruta para get all emails
router.get("/emails", getAllEmails);
// ruta para enviar correos de pagos
router.post("/send-email-pays", sendEmailPays); 
module.exports = router;
