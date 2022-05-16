const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Warehouse_Products = require("./Warehouse_Products");
const Products = require("./Products");

const Request_Stock = sequelize.define("request_stock", {
  warehouseRequestingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  warehouseRequestedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "request needed",
    allowNull: false,
    validate: {
      isIn: {
        args: [
          [
            "request needed",
            "waiting response",
            "request approved",
            "request rejected",
          ],
        ],
        msg: "Wrong Value!",
      },
    },
  },
});

module.exports = Request_Stock;
