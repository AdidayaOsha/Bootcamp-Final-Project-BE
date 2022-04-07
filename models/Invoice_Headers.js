const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Users = require("./Users");
const User_Address = require("./User_Address");
const Shipment_Master = require("./Shipment_Master");
const Warehouse = require("./Warehouse");

const Invoice_Header = sequelize.define("invoice_header", {
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

module.exports = Invoice_Header;

Invoice_Header.hasOne(Users);
Users.belongsTo(Invoice_Header);

Invoice_Header.hasMany(User_Address);
User_Address.belongsTo(Invoice_Header);

Invoice_Header.hasOne(Shipment_Master);
Shipment_Master.belongsTo(Invoice_Header);

Invoice_Header.hasOne(Warehouse);
Warehouse.belongsTo(Invoice_Header);
