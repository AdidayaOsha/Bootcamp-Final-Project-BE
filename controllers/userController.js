const db = require("../db");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const { createToken } = require("../helper/createToken");
const transporter = require("../helper/nodemailer");

module.exports = {
  getUsers: async (req, res) => {
    Users.sync({ alter: true });
    try {
      let users = await Users.findAll({});
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getUserById: async (req, res) => {
    Users.sync({ alter: true });
    try {
      let id = req.params.id;
      let user = await Users.findOne({
        where: {
          id: id,
        },
      });
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  register: async (req, res) => {
    Users.sync({ alter: true });
    try {
      const { full_name, username, email, password } = req.body;
      const alreadyExist = await Users.findOne({ where: { email } }).catch(
        (err) => {
          console.log("Error: ", err);
        }
      );
      if (alreadyExist) {
        return res.json({ message: "User with that email is already exist!" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      let user = await Users.create({
        full_name,
        username,
        email,
        password: hashedPassword,
      });
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send("Error when Registering!");
    }
  },
  verification: async (req, res) => {
    Users.sync({ alter: true });
  },
  login: async (req, res) => {
    Users.sync({ alter: true });
  },
  delete: async (req, res) => {
    Users.sync({ alter: true });
  },
};
