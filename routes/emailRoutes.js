const express = require("express");
const { sendEmail, getAllEmails, sendEmailPays, sendReturnEmail } = require("../controllers/emailController");
const router = express.Router();

// config de multer
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});
// Ruta para enviar correos
router.post("/send-email", sendEmail);
// ruta para get all emails
router.get("/emails", getAllEmails);
// ruta para enviar correos de devoluciones
router.post("/send-return-email", upload.single("file"), sendReturnEmail);
// ruta para enviar correos de pagos
router.post("/send-email-pays", sendEmailPays); 
module.exports = router;
