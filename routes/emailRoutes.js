const express = require("express");
const { sendEmail, getAllEmails } = require("../controllers/emailController");
const router = express.Router();
// Ruta para enviar correos
router.post("/send-email", sendEmail);
// ruta para get all emails
router.get("/emails", getAllEmails);
module.exports = router;
