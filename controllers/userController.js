const db = require("../db");
const Users = require("../models/Users")

module.exports = {
  getUsers: async (req, res) => {
    Users.sync({ alter: true });
    try {
      let users = await Users.findAll({
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getUsersById: async (req, res) => {
    Users.sync({ alter: true });
    try {
      let id = req.params.id;
      let user = await Users.findOne({ where: { id: id } });
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  register: async (req, res) => {
    Users.sync({ alter: true });
  },
  verification: async (req, res) => {
    Users.sync({ alter: true });
  },
  login: async (req, res) => {
    Users.sync({ alter: true });
  },
  delete: async (req, res) => {
    Users.sync({ alter: true });
  }
};
