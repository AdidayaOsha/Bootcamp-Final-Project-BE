const db = require("../db");
const Carts = require("../models/Carts");
const Invoice_Headers = require("../models/Invoice_Headers");
const Invoice_Details = require("../models/Invoice_Details");
const Payment_Options = require("../models/Payment_Options");
const Products = require("../models/Products");
const Shipment_Masters = require("../models/Shipment_Masters");
const Users = require("../models/Users");
const Warehouse_Products = require("../models/Warehouse_Products");
const Payment_Confirmations = require("../models/Payment_Confirmations");
const User_Addresses = require("../models/User_Addresses");

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
    Carts.sync({ alter: true });
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
      const {
        total,
        status,
        userAddressId,
        shipmentMasterId,
        userId,
        paymentOptionId,
      } = req.body;

      const cartItems = await Carts.findAll({
        where: { userId },
        include: { model: Products, include: Warehouse_Products },
      });

      const invoiceHeader = await Invoice_Headers.create({
        total,
        status,
        userAddressId,
        shipmentMasterId,
        userId,
        paymentOptionId,
      });

      const invoiceDetails = await Invoice_Details.bulkCreate(
        cartItems.map((val) => ({
          price: val.product.price,
          quantity: val.quantity,
          subtotal: val.quantity * val.product.price,
          invoiceHeaderId: invoiceHeader.id,
          productId: val.productId,
        }))
      );

      const stockReserved = cartItems.forEach((val) => {
        Warehouse_Products.update(
          {
            stock_reserved:
              val.product.warehouse_products[0].stock_reserved + val.quantity,
          },
          { where: { productId: val.productId } }
        );
      });

      await Carts.destroy({ where: { userId } });

      res.status(200).send({
        message: "Invoice Has Been Generated Successfully",
        id: invoiceHeader.id,
        stockReserved,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getInvoiceHeader: async (req, res) => {
    try {
      const id = req.params.id;
      const invoiceHeader = await Invoice_Headers.findOne({
        where: { id: id },
        include: [
          { model: User_Addresses },
          { model: Invoice_Details, include: Products },
          { model: Shipment_Masters },
          { model: Payment_Options },
        ],
      });
      res.status(200).send(invoiceHeader);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  addPaymentProof: async (req, res) => {
    // Products.sync({ alter: true });
    try {
      let data = {
        payment_proof: req.file.path,
        invoiceHeaderId: req.body.invoiceHeaderId,
      };
      const paymentproof = await Payment_Confirmations.create(data);
      res.status(200).send(paymentproof);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(req.file);
  },
  getPaymentProof: async (req, res) => {
    try {
      const invoiceHeaderId = req.params.id;
      const paymentProof = await Payment_Confirmations.findOne({
        where: { invoiceHeaderId: invoiceHeaderId },
      });
      res.status(200).send(paymentProof);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
