const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Cities = require("./Cities");

const Districts = sequelize.define(
  "districts",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Districts;

Cities.hasMany(Districts);
Districts.belongsTo(Cities);
