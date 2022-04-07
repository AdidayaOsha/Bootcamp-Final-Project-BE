const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");

const Warehouse = sequelize.define("warehouse", {
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  province: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postal_code: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Warehouse;
