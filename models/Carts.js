const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Products = require("./Products");
const Users = require("./Users");

const Cart = sequelize.define("cart", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Cart;

Products.hasMany(Cart);
Cart.belongsTo(Products);

Users.hasMany(Cart);
Cart.belongsTo(Users);
