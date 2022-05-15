const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Warehouses = require("./Warehouses");
const Products = require("./Products");
const Warehouse_Products = require("./Warehouse_Products");

const Shipping_Product = sequelize.define("shipping_product", {
  total_product: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},
);

module.exports = Shipping_Product;

Shipping_Product.belongsTo(Warehouses, {as: 'warehouseReq'});
Shipping_Product.belongsTo(Warehouses, {as: 'warehouseRes'});
Shipping_Product.belongsTo(Products);
// Shipping_Product.belongsTo(Warehouse_Products);
// Warehouses.hasMany(Shipping_Product);
// Products.hasMany(Shipping_Product);
// Warehouse_Products.hasMany(Shipping_Product);