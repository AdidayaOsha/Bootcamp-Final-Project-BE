const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Users = require("./Users");

const User_Address = sequelize.define(
  "user_address",
  {
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
  },
  {
    paranoid: true,
  }
);

module.exports = User_Address;

User_Address.hasOne(Users);
Users.belongsTo(User_Address);
