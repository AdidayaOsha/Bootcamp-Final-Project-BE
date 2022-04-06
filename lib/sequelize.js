const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bootcamp_group_1", "root", "@Akuakuocha1191", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+07:00",
});

module.exports = sequelize;
