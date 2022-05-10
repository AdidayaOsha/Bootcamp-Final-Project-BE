const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Products = require("./Products");

const Product_Categories = sequelize.define(
  "product_categories",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Product_Categories;
