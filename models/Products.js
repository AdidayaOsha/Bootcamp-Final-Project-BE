const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Product_Categories = require("./Product_Categories");

const Products = sequelize.define(
  "products",
  {
    product_image: {
      type: DataTypes.STRING,
      defaultValue: "a path to the image",
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: "example of the File Name",
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
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Products;

Product_Categories.hasMany(Products);
Products.belongsTo(Product_Categories);
