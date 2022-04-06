const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Invoice_Header = require("./Invoice_Header");
const Admin = require("./Admin");
const Users = require("./Users");

const Payment_Confirmation = sequelize.define("payment_confirmation", {
  payment_proof: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Payment_Confirmation;

Payment_Confirmation.hasOne(Admin);
Admin.belongsTo(Payment_Confirmation);

Payment_Confirmation.hasOne(Users);
Users.belongsTo(Payment_Confirmation);

Payment_Confirmation.hasOne(Invoice_Header);
Invoice_Header.belongsTo(Payment_Confirmation);
