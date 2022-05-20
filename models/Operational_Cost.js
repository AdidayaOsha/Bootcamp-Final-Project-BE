const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");
const Warehouses = require("./Warehouses");

const Operational_Cost = sequelize.define("operational_cost", {
  cost: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  total_time: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
},
{
  paranoid: true,
}
);

module.exports = Operational_Cost;

Operational_Cost.belongsTo(Warehouses, {as: 'warehouseReq'});
Operational_Cost.belongsTo(Warehouses, {as: 'warehouseRes'});