// routes/productRoutes.js
const express = require("express");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProductNames,
  getCategoriesWithProductNames,
  getSubcategoriesWithProductNames,
  getProductsByCategory,
  getProductsBySubcategory,
  getProductByName
} = require("../controllers/productController"); // Asegúrate de que la ruta sea correcta
const router = express.Router();
/**
 * Ruta para crear un nuevo producto.
 *
 * @route  POST /create
 */
router.post("/", createProduct);
/**
 * Ruta para obtener todos los productos.
 *
 * @route GET /
 */
router.get("/", getAllProducts); // Asegúrate de que esta sea la ruta correcta
/**
 * Ruta para eliminar el producto por id.
 *
 * @route DELETE /
 */
router.delete("/:id", deleteProduct);
/**
 * Ruta para consultar los nombres de los producto.
 *
 * @route GET FOR NAME /
 */
router.get("/names", getProductNames);
/**
 * Ruta para consultar las categorias y los productos de la categoria correspondiente.
 *
 * @route GET FOR category /
 */
router.get("/categories-with-product-names", getCategoriesWithProductNames)
/**
 * Ruta para consultar las categorias y los productos de la categoria correspondiente.
 *
 * @route GET FOR category /
 */
router.get("/subcategories-with-product-names", getSubcategoriesWithProductNames)
/**
 * Ruta para consultar las categorias y trae los productos de la categoria correspondiente.
 *
 * @route GET FOR category /
 */
router.get("/:category", getProductsByCategory)
/**
 * Ruta para consultar las subcategorias y trae los productos de la subcategoria correspondiente.
 *
 * @route GET FOR sybcategory /
 */
router.get("/subcategories/:subcategory", getProductsBySubcategory)
/**
 * Ruta para consultar slug.parameters y trae el producto correspondiente.
 *
 * @route GET FOR sybcategory /
 */
router.get("/name/:name", getProductByName)
module.exports = router;