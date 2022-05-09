const db = require("../db");
const Carts = require("../models/Carts");
const Payment_Options = require("../models/Payment_Options");
const Products = require("../models/Products");
const Shipment_Masters = require("../models/Shipment_Masters");
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
  updateCartQty: async (req, res) => {
    try {
      let id = req.params.id;
      let { userId } = req.body;
      const carts = await Carts.update(req.body, { where: { id: id } });
      const getUserCart = await Carts.findAll({
        where: { userId },
        include: [
          {
            model: Products,
            include: [{ model: Warehouse_Products }],
          },
        ],
      });
      res.status(200).send({ carts, getUserCart });
    } catch (err) {
      res.status(500).send(err);
    }
  },
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
  getShipments: async (req, res) => {
    Shipment_Masters.sync({ alter: true });
    try {
      const shipments = await Shipment_Masters.findAll({});
      res.status(200).send(shipments);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getPaymentOptions: async (req, res) => {
    Payment_Options.sync({ alter: true });
    try {
      const payment = await Payment_Options.findAll({});
      res.status(200).send(payment);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
