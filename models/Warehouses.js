const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Invoice_Headers = require("./Invoice_Headers");

const Warehouses = sequelize.define(
  "warehouses",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
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
  },
  {
    timestamps: false,
  }
);

module.exports = Warehouses;

Warehouses.hasOne(Invoice_Headers);
Invoice_Headers.belongsTo(Warehouses);
