const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Invoice_Header = require("./Invoice_Header");
const Products = require("./Products");

const Invoice_Details = sequelize.define("invoice_details", {
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Invoice_Details;

Invoice_Details.hasMany(Products);
Products.belongsTo(Invoice_Details);

Invoice_Details.hasOne(Invoice_Header);
Invoice_Header.belongsTo(Invoice_Details);
