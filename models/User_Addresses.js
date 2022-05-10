const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");

const User_Addresses = sequelize.define(
  "user_addresses",
  {
    address_line: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = User_Addresses;
