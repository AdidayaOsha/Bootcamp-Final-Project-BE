const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");

const Payment_Options = sequelize.define("payment_options", {
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Payment_Options;
