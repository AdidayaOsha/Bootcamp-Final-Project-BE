const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Products = require("./Products");

const Warehouse_Products = sequelize.define("warehouse_products", {
  stock_ready: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  stock_reserved: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Warehouse_Products;
