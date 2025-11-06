const express = require("express");
const router = express.Router();
const postController = require("../controllers/postsController.js");
// Crear un nuevo artículo
router.post("/", postController.createPost);
// Obtener todos los artículos
router.get("/", postController.getAllPosts);
// Obtener un artículo por su slug
router.get("/:slug", postController.getPostBySlug);
// Actualizar un artículo por su slug
router.put("/:slug", postController.updatePost);
// Eliminar un artículo por su slug
router.delete("/:slug", postController.deletePost);
module.exports = router;