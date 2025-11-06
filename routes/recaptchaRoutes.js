// backend/routes/recaptchaRoutes.js
const express = require('express');
const { verifyRecaptcha } = require('../controllers/recaptchaController.js');
const router = express.Router();
// Ruta POST para verificar el reCAPTCHA
router.post('/verify-recaptcha', verifyRecaptcha);
module.exports = router;