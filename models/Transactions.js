const sequelize = require("../lib/sequelize");
const { DataTypes } = require("sequelize");

const Transactions = sequelize.define("transactions", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Transactions;