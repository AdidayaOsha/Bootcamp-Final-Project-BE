const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define("admin", {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha: {
        msg: "Only letters are allowed",
      },
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Wrong Email format!",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: {
        msg: "Must be a combination of characters, and numerals",
      },
    },
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Admin;
