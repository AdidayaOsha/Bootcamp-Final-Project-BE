const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Users = require("./Users");

const User_Addresses = sequelize.define("user_addresses", {
  address_line1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address_line2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  province: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postal_code: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  mobile: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = User_Addresses;
