const Post = require("../models/posts.js"); // Asegúrate de que la ruta es correcta
const NodeCache = require("node-cache");
// Función para generar un slug
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });  
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-") // Reemplaza los espacios por guiones
    .replace(/[^\w-]+/g, "") // Elimina caracteres no alfanuméricos y guiones
    .normalize("NFD") // Elimina los acentos
    .replace(/[\u0300-\u036f]/g, ""); // Elimina los caracteres de acentos
};
// Crear un nuevo artículo
const createPost = async (req, res) => {
  try {
    const {
      title,
      htmlPost,
      previewCategory,
      previewTitle,
      previewImage,
      previewExcerpt,
      seoOgUrl,
      seoTitle,
      seoOgTitle,
      seoKeywords,
      seoDescription,
      seoOgDescription,
      categoryPost,
    } = req.body;
    // Generar el slug a partir del título
    const slug = generateSlug(title);

    // Crear el nuevo post con el slug generado
    const newPost = await Post.create({
      title,
      htmlPost,
      previewCategory,
      previewTitle,
      previewImage,
      previewExcerpt,
      seoTitle,
      seoOgTitle,
      seoKeywords,
      seoDescription,
      seoOgDescription,
      categoryPost,
      slug, // Asignar el slug generado
    });
    cache.del("allPosts");
    return res.status(201).json(newPost);
  } catch (error) {
    console.error("Error al crear el post:", error);
    return res.status(500).json({ message: "Error al crear el artículo" });
  }
};
// Obtener todos los artículos
const getAllPosts = async (req, res) => {
  try {
    const cachedPosts = cache.get("allPosts");
    if (cachedPosts) {
      return res.status(200).json(cachedPosts);
    }
    const posts = await Post.findAll();
    cache.set("allPosts", posts);
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    return res.status(500).json({ message: "Error al obtener los artículos" });
  }
};

// Obtener un artículo por su slug
const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const cachedPost = cache.get(`post_${slug}`);
    if (cachedPost) {
      return res.status(200).json(cachedPost);
    }

    const post = await Post.findOne({ where: { slug } });

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    cache.set(`post_${slug}`, post);
    return res.status(200).json(post);
  } catch (error) {
    console.error("Error al obtener el post:", error);
    return res.status(500).json({ message: "Error al obtener el artículo" });
  }
};

// Actualizar un artículo
const updatePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const {
      title,
      htmlPost,
      previewCategory,
      previewTitle,
      previewImage,
      previewExcerpt,
      seoTitle,
      seoOgTitle,
      seoKeywords,
      seoDescription,
      seoOgDescription,
    } = req.body;

    const post = await Post.findOne({ where: { slug } });

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    // Generar el nuevo slug si el título fue actualizado
    const newSlug = generateSlug(title);

    await post.update({
      title,
      htmlPost,
      previewCategory,
      previewTitle,
      previewImage,
      previewExcerpt,
      seoTitle,
      seoOgTitle,
      seoKeywords,
      seoDescription,
      seoOgDescription,
      slug: newSlug, // Asignar el nuevo slug
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error al actualizar el post:", error);
    return res.status(500).json({ message: "Error al actualizar el artículo" });
  }
};

// Eliminar un artículo
const deletePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ where: { slug } });

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    await post.destroy();
    cache.del(`post_${slug}`);
    cache.del("allPosts");
    return res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el post:", error);
    return res.status(500).json({ message: "Error al eliminar el artículo" });
  }
};
module.exports = {
  createPost,
  getAllPosts,
  getPostBySlug,
  updatePost,
  deletePost,
};
