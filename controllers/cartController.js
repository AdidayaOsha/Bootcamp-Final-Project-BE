const db = require("../db");
const Carts = require("../models/Carts");
const Products = require("../models/Products");
const Users = require("../models/Users");
const Warehouse_Products = require("../models/Warehouse_Products");

module.exports = {
  getUserCart: async (req, res) => {
    // Products.sync({ alter: true });
    try {
      let id = req.params.id;
      let carts = await Users.findOne({
        where: { id: id },
        include: [
          {
            model: Carts,
            include: [{ model: Products, include: Warehouse_Products }],
          },
        ],
      });
      res.status(200).send(carts);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updateUserCart: (req, res) => {},
  addUserCart: async (req, res) => {
    Carts.sync({ alter: true });
    try {
      let data = {
        quantity: req.body.quantity,
        userId: req.body.userId,
        productId: req.body.productId,
      };
      const cart = await Carts.create(data);
      res.status(200).send(cart);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(req.file);
  },
  deleteUserCart: (req, res) => {},
};
