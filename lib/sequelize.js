const { Sequelize } = require("sequelize");

//masukin password mysql kalian
const sequelize = new Sequelize("bootcamp_group_1", "root", "@Akuakuocha1191", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+07:00",
});

module.exports = sequelize;
