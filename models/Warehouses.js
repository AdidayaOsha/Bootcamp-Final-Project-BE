const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Warehouse_Products = require("./Warehouse_Products");
const Products = require("./Products");

const Warehouses = sequelize.define(
  "warehouses",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
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
      allowNull: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Warehouses;
