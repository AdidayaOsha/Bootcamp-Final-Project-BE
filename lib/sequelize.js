const { Sequelize } = require("sequelize");

//masukin password mysql kalian
const sequelize = new Sequelize("tesbootcamp", "root", "passwordSONYA", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+07:00",
});

module.exports = sequelize;
