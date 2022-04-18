const db = require("../db");
const Carts = require("../models/Carts");
const Products = require("../models/Products");
const Users = require("../models/Users");

module.exports = {
  getCart: async (req, res) => {
    // Products.sync({ alter: true });
    try {
      let carts = await Carts.findAll({
        include: [{ model: Products }, { model: Users }],
      });
      res.status(200).send(carts);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updateUserCart: (req, res) => {},
  addUserCart: (req, res) => {},
  deleteUserCart: (req, res) => {},
};
