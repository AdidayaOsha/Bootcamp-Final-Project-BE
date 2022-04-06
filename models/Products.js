const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Product_Category = require("./Product_Category");

const Products = sequelize.define(
  "products",
  {
    product_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Only numbers is allowed",
        },
      },
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Products;

Products.hasOne(Product_Category);
Product_Category.belongsTo(Products);
