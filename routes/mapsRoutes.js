const express = require("express");
const { sendMaps, getAllMaps } = require("../controllers/mapsMailController");
const router = express.Router();
// Ruta para enviar correos
router.post("/send-maps", sendMaps);
// ruta para get all emails
router.get("/maps", getAllMaps);
module.exports = router;
