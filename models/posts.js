const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // Asegúrate de que la ruta es correcta
const Post = sequelize.define("Post", {
  // Título del artículo
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Contenido completo del artículo
  htmlPost: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Información de la vista previa
  previewCategory: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  previewTitle: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  previewImage: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  previewExcerpt: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // SEO
  seoTitle: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  seoOgTitle: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  seoKeywords: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  seoDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  seoOgDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  author: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  source: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  // Slug para el artículo
  slug: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  // categoria del post (blog o noticia)
  categoryPost: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
// Exportar el modelo
module.exports = Post;