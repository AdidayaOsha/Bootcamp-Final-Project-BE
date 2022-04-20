const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Products = require("./Products");
const Users = require("./Users");

const Carts = sequelize.define("carts", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Carts;

Products.hasMany(Carts);
Carts.belongsTo(Products);

Users.hasMany(Carts);
Carts.belongsTo(Users);
