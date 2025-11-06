// backend/models/recaptchaModel.js
const https = require("https");
const querystring = require("querystring");

const secretKey = "6LeRIXgqAAAAAJaZzDL-ErbwyNOnbNYUhpuZqhqP"; // Reemplaza con tu clave secreta

const verifyRecaptchaResponse = (recaptchaResponse) => {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      secret: secretKey,
      response: recaptchaResponse,
    });

    const options = {
      hostname: "www.google.com",
      port: 443,
      path: "/recaptcha/api/siteverify",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      // Recibe la respuesta de la API de Google
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(data);
          if (response.success) {
            resolve(response);
            console.log(response);
          } else {
            reject(new Error("Error de verificación de reCAPTCHA"));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      console.error("Error en la solicitud a reCAPTCHA:", error);
      reject(error);
    });

    // Envía los datos
    req.write(postData);
    req.end();
  });
};

module.exports = { verifyRecaptchaResponse };
