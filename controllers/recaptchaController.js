// backend/controllers/recaptchaController.js
const { verifyRecaptchaResponse } = require("../models/recaptcha.js");

const verifyRecaptcha = async (req, res) => {
  const { recaptchaResponse } = req.body;

  if (!recaptchaResponse) {
    return res
      .status(400)
      .json({ success: false, message: "Falta la respuesta de reCAPTCHA" });
  }

  try {
    // Verifica la respuesta del reCAPTCHA utilizando el modelo
    const verificationResult = await verifyRecaptchaResponse(recaptchaResponse);

    if (!verificationResult.success) {
      return res
        .status(400)
        .json({ success: false, message: "Verificación de reCAPTCHA fallida" });
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("Error en la verificación de reCAPTCHA:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error al verificar reCAPTCHA" });
  }
};

module.exports = { verifyRecaptcha };
