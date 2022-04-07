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

Cart.hasMany(Products);
Products.belongsTo(Cart);

Cart.hasOne(Users);
Users.belongsTo(Cart);
