const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Products = require("./Products");
const Warehouses = require("./Warehouses");

const Warehouse_Products = sequelize.define("warehouse_products", {
  stock_ready: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  stock_reserved: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});

module.exports = Warehouse_Products;

Warehouses.hasMany(Warehouse_Products);
Warehouse_Products.belongsTo(Warehouses);
