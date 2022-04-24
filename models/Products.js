const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Product_Categories = require("./Product_Categories");
const Warehouse_Products = require("./Warehouse_Products");

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
      defaultValue: "",
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
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
  },
  {
    paranoid: true,
  }
);

module.exports = Products;

Product_Categories.hasMany(Products);
Products.belongsTo(Product_Categories);

Products.hasMany(Warehouse_Products);
Warehouse_Products.belongsTo(Products);
