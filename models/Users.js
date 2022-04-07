const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const User_Address = require("./User_Addresses");

const Users = sequelize.define("users", {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-Z0-9._]*$/,
        msg: "Must be alphanumeric, (-), (_), and (.) are allowed",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Wrong email format!",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-Z0-9._]*$/,
        msg: "Must be alphanumeric, (-), (_), and (.) are allowed",
      },
    },
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Users;

Users.hasMany(User_Address);
User_Address.belongsTo(Users);
