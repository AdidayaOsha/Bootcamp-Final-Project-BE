const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const User_Addresses = require("./User_Addresses");
const Payment_Confirmations = require("./Payment_Confirmations");
const Shipment_Masters = require("./Shipment_Masters");
const Invoice_Details = require("./Invoice_Details");
const Users = require("./Users");
const Payment_Options = require("./Payment_Options");

const Invoice_Headers = sequelize.define("invoice_headers", {
  total: {
    type: DataTypes.DECIMAL,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
    allowNull: false,
    validate: {
      isIn: {
        args: [["pending", "approved", "rejected"]],
        msg: "Wrong Value!",
      },
    },
  },
});

module.exports = Invoice_Headers;

User_Addresses.hasOne(Invoice_Headers);
Invoice_Headers.belongsTo(User_Addresses);

Shipment_Masters.hasOne(Invoice_Headers);
Invoice_Headers.belongsTo(Shipment_Masters);

Payment_Options.hasOne(Invoice_Headers);
Invoice_Headers.belongsTo(Payment_Options);

Payment_Confirmations.hasOne(Invoice_Headers);
Invoice_Headers.belongsTo(Payment_Confirmations);

Invoice_Headers.hasMany(Invoice_Details);
Invoice_Details.belongsTo(Invoice_Headers);

Users.hasMany(Invoice_Headers);
Invoice_Headers.belongsTo(Users);
