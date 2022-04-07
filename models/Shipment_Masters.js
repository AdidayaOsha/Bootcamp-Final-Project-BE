const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");

const Shipment_Master = sequelize.define("shipment_master", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Shipment_Master;
