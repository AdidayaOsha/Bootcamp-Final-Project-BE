const db = require("../db");
const Carts = require("../models/Carts");
const Invoice_Headers = require("../models/Invoice_Headers");
const Invoice_Details = require("../models/Invoice_Details");
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
    // Carts.sync({ alter: true });
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
  deleteUserCart: async (req, res) => {
    try {
      let id = req.params.id;
      let { userId } = req.body;
      await Carts.destroy({ where: { id: id } });
      const getUserCart = await Carts.findAll({
        where: { userId },
        include: [
          {
            model: Products,
            include: [{ model: Warehouse_Products }],
          },
        ],
      });
      res.status(200).send(getUserCart);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getPaymentOptions: async (req, res) => {
    // Payment_Options.sync({ alter: true });
    try {
      const payment = await Payment_Options.findAll({});
      res.status(200).send(payment);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getPaymentOptionById: async (req, res) => {
    // Payment_Options.sync({ alter: true });
    try {
      let paymentId = req.params.id;
      const payment = await Payment_Options.findOne({
        where: { id: paymentId },
      });
      res.status(200).send(payment);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getShipmentOptions: async (req, res) => {
    // Shipment_Masters.sync({ alter: true });
    try {
      const shipment = await Shipment_Masters.findAll({});
      res.status(200).send(shipment);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getShipmentOptionById: async (req, res) => {
    // Shipment_Masters.sync({ alter: true });
    try {
      let shipmentId = req.params.id;
      const shipment = await Shipment_Masters.findOne({
        where: { id: shipmentId },
      });
      res.status(200).send(shipment);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  submitCheckout: async (req, res) => {
    try {
      let data = {
        total: req.body.total,
        status: req.body.status,
        userAddressId: req.body.userAddressId,
        warehouseId: req.body.warehouseId,
        paymentConfirmationId: req.body.paymentConfirmationId,
        shipmentMasterId: req.body.shipmentMasterId,
        userId: req.body.userId,
        paymentOptionId: req.body.paymentOptionId,
      };
      const checkout = await Invoice_Headers.create(data);
      await checkout.createInvoice_Details({
        price: req.body.price,
        quantity: req.body.quantity,
        invoiceHeaderId: req.body.invoiceHeaderId,
        productId: req.body.productId,
      });
      res.status(200).send(checkout);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
