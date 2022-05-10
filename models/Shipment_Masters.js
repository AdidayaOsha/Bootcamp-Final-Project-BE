const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");

const Shipment_Masters = sequelize.define("shipment_masters", {
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Shipment_Masters;
