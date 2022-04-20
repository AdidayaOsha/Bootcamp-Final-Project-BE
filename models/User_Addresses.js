const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Users = require("./Users");

const User_Addresses = sequelize.define("user_addresses", {
  address_line: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address_type: {
    type: DataTypes.STRING,
    allowNull: true,
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
  isDefault: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = User_Addresses;
