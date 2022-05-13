const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");

const Payment_Confirmations = sequelize.define("payment_confirmations", {
  payment_proof: {
    type: DataTypes.STRING,
    defaultValue: "a path to the image",
    allowNull: true,
  },
});

module.exports = Payment_Confirmations;
