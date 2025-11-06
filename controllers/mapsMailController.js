const Maps = require("../models/maps");

const sendMaps = async (req, res) => {
  const { maps } = req.body;

  // Verifica que 'maps' sea un array antes de intentar usar .join()
  if (!Array.isArray(maps) || maps.length === 0) {
    return res
      .status(400)
      .json({ message: "El campo 'maps' debe ser un array no vacío" });
  }

  try {
    // Guarda el mensaje en la base de datos
    await Maps.create({ maps });

    res.status(200).json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
};

/**
 * Obtiene todos los productos.
 *
 * @param {Object} req - La solicitud del cliente.
 * @param {Object} res - La respuesta al cliente.
 */
const getAllMaps = async (req, res) => {
  try {
    // Obtiene todos los productos
    const maps = await Maps.findAll();
    res.status(200).json({ maps });
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

module.exports = { sendMaps, getAllMaps };
