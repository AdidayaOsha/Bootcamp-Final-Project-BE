const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");

const Provinces = sequelize.define(
  "provinces",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Provinces;
