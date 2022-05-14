const { Sequelize } = require("sequelize");
require("dotenv").config();

//masukin password mysql kalian
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    timezone: "+07:00",
    logging: false,
  }
);

module.exports = sequelize;
