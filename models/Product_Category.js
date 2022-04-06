const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");

const Products_Category = sequelize.define(
  "product_category",
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

module.exports = Products_Category;
