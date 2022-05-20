const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Invoice_Headers = require("./Invoice_Headers");

const Payment_Confirmations = sequelize.define("payment_confirmations", {
  payment_proof: {
    type: DataTypes.STRING,
    defaultValue: "a path to the image",
    allowNull: true,
  },
});

module.exports = Payment_Confirmations;

// Invoice_Headers.hasOne(Payment_Confirmations);
// Payment_Confirmations.belongsTo(Invoice_Headers);
