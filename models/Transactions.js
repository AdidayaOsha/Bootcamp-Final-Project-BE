const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Invoice_Headers = require("./Invoice_Headers");
const Request_Stock = require("./Request_Stock");
const Payment_Confirmations = require("./Payment_Confirmations");

const Transactions = sequelize.define("transactions", {
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
    allowNull: false,
    validate: {
      isIn: {
        args: [
          [
            "pending",
            "request needed",
            "Ready to process",
            "waiting request",
            "approved request",
            "rejected request",
            "Delivered",
            "Rejected",
          ],
        ],
        msg: "Wrong Value!",
      },
    },
  },
});

module.exports = Transactions;

Invoice_Headers.hasOne(Transactions);
Transactions.belongsTo(Invoice_Headers);

// Payment_Confirmations.hasOne(Transactions);
// Transactions.belongsTo(Payment_Confirmations);
