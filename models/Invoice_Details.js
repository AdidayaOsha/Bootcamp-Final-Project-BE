const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");

const Invoice_Details = sequelize.define("invoice_details", {
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Invoice_Details;