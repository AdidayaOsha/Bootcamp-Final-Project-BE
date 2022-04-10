const { Sequelize } = require("sequelize");

//masukin password mysql kalian
const sequelize = new Sequelize("tesbootcamp", "root", "@Akuakuocha1191", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+07:00",
});

module.exports = sequelize;
