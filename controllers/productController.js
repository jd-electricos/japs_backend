// controllers/productControllers.js
const Product = require("../models/product.js");
const { Sequelize } = require("sequelize");
const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 28800, checkperiod: 600 });
/**
 * Crea un nuevo producto.
 * @param {Object} req - La solicitud del cliente, debe contener la información del producto en el cuerpo.
 * @param {Object} res - La respuesta al cliente.
 */
const createProduct = async (req, res) => {
  const {
    alt,
    name,
    reference,
    category,
    subcategory,
    stock,
    inventoryStatus,
    technical_parameters,
    description,
    carousel,
    suggestions,
    seo,
    brand
  } = req.body;
  try {
    // Crea el producto
    const product = await Product.create({
      alt,
      name,
      reference,
      category,
      subcategory,
      stock,
      inventoryStatus,
      technical_parameters,
      description,
      carousel, // Añadir el campo carousel aquí
      suggestions, // Añadir el campo suggestions aquí
      seo, // Añadir el campo seo aquí
      brand
    });
    cache.flushAll();
    res.status(201).json({ message: "Producto registrado con éxito", product });
  } catch (err) {
    console.error("Error al registrar producto:", err);
    res.status(500).json({ error: "Error al registrar producto" });
  }
};
/**
 * Elimina un producto por ID.
 *
 * @param {Object} req - La solicitud del cliente, debe contener el ID del producto en los parámetros.
 * @param {Object} res - La respuesta al cliente.
 */
const deleteProduct = async (req, res) => {
  const { id } = req.params; // Obtener el ID del producto de los parámetros
  try {
    const deletedCount = await Product.destroy({
      where: { id },
    });
    if (deletedCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    cache.flushAll();
    res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};
/**
 * Obtiene todos los productos.
 *
 * @param {Object} req - La solicitud del cliente.
 * @param {Object} res - La respuesta al cliente.
 */
const getAllProducts = async (req, res) => {
  const cacheKey = "all_products";
  const cachedData = cache.get(cacheKey);
  if (cachedData) return res.status(200).json(cachedData);
  try {
    // Obtiene todos los productos
    const products = await Product.findAll();
    cache.set(cacheKey, { products });
    res.status(200).json({ products });
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};
/**
 * Obtiene todos los nombres de productos.
 *
 * @param {Object} req - La solicitud del cliente.
 * @param {Object} res - La respuesta al cliente.
 */
const getProductNames = async (req, res) => {
  const cacheKey = "product_names";
  const cachedData = cache.get(cacheKey);
  if (cachedData) return res.status(200).json(cachedData);
  try {
    // Obtiene solo los nombres de todos los productos
    const products = await Product.findAll({
      attributes: ["name"],
      order: [["name", "ASC"]],
      raw: true,
    });
    cache.set(cacheKey, { productNames });
    // Extraer los nombres de los productos
    const productNames = products.map((product) => product.name);

    res.status(200).json({ productNames });
  } catch (err) {
    console.error("Error al obtener nombres de productos:", err);
    res.status(500).json({ error: "Error al obtener nombres de productos" });
  }
};
/**
 * Obtiene todas las categorías y los nombres de productos para cada una.
 *
 * @param {Object} req - La solicitud del cliente.
 * @param {Object} res - La respuesta al cliente.
 */
const getCategoriesWithProductNames = async (req, res) => {
  const cacheKey = "categories_with_product_names";
  const cachedData = cache.get(cacheKey);
  if (cachedData) return res.status(200).json(cachedData);
  try {
    const categories = await Product.findAll({
      attributes: [
        "category",
        [Sequelize.fn("array_agg", Sequelize.col("name")), "productNames"],
      ],
      group: ["category"],
      order: [["category", "ASC"]],
      raw: true,
    });
    cache.set(cacheKey, { categories });
    res.status(200).json({ categories });
  } catch (err) {
    console.error("Error al obtener categorías y nombres de productos:", err);
    res
      .status(500)
      .json({ error: "Error al obtener categorías y nombres de productos" });
  }
};
/**
 * Obtiene todas las categorías y subcategorias con los nombres de productos para cada una.
 *
 * @param {Object} req - La solicitud del cliente.
 * @param {Object} res - La respuesta al cliente.
 */
const getSubcategoriesWithProductNames = async (req, res) => {
  const cacheKey = "subcategories_with_product_names";
  const cachedData = cache.get(cacheKey);
  if (cachedData) return res.status(200).json(cachedData);
  try {
    const subcategories = await Product.findAll({
      attributes: [
        "category",
        "subcategory",
        [
          Sequelize.fn(
            "array_agg",
            Sequelize.literal(`json_build_object('alt', alt, 'name', name)`)
          ),
          "productNames",
        ],
      ],
      group: ["category", "subcategory"],
      order: [
        ["category", "ASC"],
        ["subcategory", "ASC"],
      ],
      raw: true,
    });
    cache.set(cacheKey, { subcategories });
    res.status(200).json({ subcategories });
  } catch (err) {
    console.error(
      "Error al obtener subcategorías y nombres de productos:",
      err
    );
    res
      .status(500)
      .json({ error: "Error al obtener subcategorías y nombres de productos" });
  }
};
/**
 * Obtiene los productos por categoría.
 *
 * @param {Object} req - La solicitud del cliente, debe contener la categoría en los parámetros.
 * @param {Object} res - La respuesta al cliente.
 */
const getProductsByCategory = async (req, res) => {
  const { category } = req.params; // Obtener la categoría de los parámetros
  const cacheKey = `products_category_${category}`; // Clave única para la caché basada en la categoría
  // Intentar obtener los datos desde la caché
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.status(200).json({ products: cachedData }); // Retorna los productos desde la caché
  }
  try {
    // Busca todos los productos que coinciden con la categoría
    const products = await Product.findAll({
      where: { category },
      order: [["name", "ASC"]], // Ordena los productos alfabéticamente por nombre
    });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron productos en esta categoría" });
    }
    // Guardar los productos en la caché por 30 minutos (1800 segundos)
    cache.set(cacheKey, products);
    res.status(200).json({ products });
  } catch (err) {
    console.error("Error al obtener productos por categoría:", err);
    res.status(500).json({ error: "Error al obtener productos por categoría" });
  }
};
/**
 * Obtiene los productos por subcategoría.
 *
 * @param {Object} req - La solicitud del cliente, debe contener la subcategoría en los parámetros.
 * @param {Object} res - La respuesta al cliente.
 */
const getProductsBySubcategory = async (req, res) => {
  const { subcategory } = req.params; // Obtener la categoría de los parámetros
  const cacheKey = `products_subcategory_${subcategory}`; // Clave única para la caché basada en la categoría
  // Intentar obtener los datos desde la caché
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.status(200).json({ products: cachedData }); // Retorna los productos desde la caché
  }
  try {
    // Busca todos los productos que coinciden con la categoría
    const products = await Product.findAll({
      where: { subcategory },
      order: [["name", "ASC"]], // Ordena los productos alfabéticamente por nombre
    });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron productos en esta categoría" });
    }
    // Guardar los productos en la caché por 30 minutos (1800 segundos)
    cache.set(cacheKey, products);
    res.status(200).json({ products });
  } catch (err) {
    console.error("Error al obtener productos por categoría:", err);
    res.status(500).json({ error: "Error al obtener productos por categoría" });
  }
};
/**
 * Busca un producto por nombre.
 *
 * @param {Object} req - La solicitud del cliente, debe contener el nombre en los parámetros.
 * @param {Object} res - La respuesta al cliente.
 */
const getProductByName = async (req, res) => {
  const { name } = req.params; // Nombre recibido del front
  const cacheKey = `product_alt_${name}`;
  // Intentar obtener los datos desde la caché
  const cachedData = cache.get(cacheKey);
  if (cachedData) return res.status(200).json({ products: [cachedData] });
  try {
    // Buscar el producto por la columna "alt" sin modificar el formato
    const product = await Product.findOne({
      where: { alt: name },
    });
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    // Guardar en caché
    cache.set(cacheKey, product);
    res.status(200).json({ products: [product] }); // Retornar en formato de array
  } catch (err) {
    console.error("Error al obtener producto por alt:", err);
    res.status(500).json({ error: "Error al obtener producto por alt" });
  }
};
module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductNames,
  getCategoriesWithProductNames,
  getSubcategoriesWithProductNames,
  getProductsByCategory,
  getProductsBySubcategory,
  getProductByName,
};
