const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // Make sure the path is correct

const Maps = sequelize.define("Maps", {
  maps: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
});

// Sync the model
async function syncMapsModel() {
  await Maps.sync();
}

syncMapsModel();

module.exports = Maps;
