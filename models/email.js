const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); //Make sure the path is correct
const Email = sequelize.define('Email', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  affair: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});
// Sync the model
async function syncEmailModel() {
  await Email.sync();
}
syncEmailModel();
module.exports = Email;