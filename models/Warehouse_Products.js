const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Products = require("./Products");
const Warehouse = require("./Warehouse");

const Warehouse_Product = sequelize.define("warehouse_product", {
  stock_ready: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  stock_reserved: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Warehouse_Product;

Warehouse_Product.hasOne(Products);
Products.belongsTo(Warehouse_Product);

Warehouse_Product.hasOne(Warehouse);
Warehouse.belongsTo(Warehouse_Product);
