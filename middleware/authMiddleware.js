const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Toma el token del encabezado

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. No se proporcionó token." });
  }

  try {
    const verified = jwt.verify(token, "secret_key"); // Usa la misma clave secreta usada para firmar los tokens
    req.user = verified; // Guarda los datos verificados en la solicitud
    next(); // Continúa al siguiente middleware
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};
const loginUser = async (req, res) => {
  // Código para verificar el usuario y la contraseña

  if (userIsValid) {
    const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });
    res.json({ token, user });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
};

module.exports = { verifyToken, loginUser };
