// models/product.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.js");

/**
 * Define el modelo de Producto.
 */
const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inventoryStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    technical_parameters: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    carousel: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    suggestions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    seo: {
      type: DataTypes.JSONB, // Almacena los datos SEO como un JSON
      allowNull: false,
    },
    brand: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: false, // No se requieren campos `createdAt` y `updatedAt`
  }
);
module.exports = Product;
