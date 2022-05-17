const db = require("../db");
const Products = require("../models/Products");
const Request_Stock = require("../models/Request_Stock");
const Warehouse_Products = require("../models/Warehouse_Products");

module.exports = {
  getRequest: async (req, res) => {
    try {
      let allRequest = await Request_Stock.findAll({
        include: [
          {
            model: Products,
            required: true,
          },
        ],
      });

      res.status(200).send(allRequest);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getRequestById: async (req, res) => {
    try {
      let allRequest = await Request_Stock.findAll({
        where: { warehouseRequestedId: req.params.id },
        include: [
          {
            model: Products,
            required: true,
          },
        ],
      });

      res.status(200).send(allRequest);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  postRequest: async (req, res) => {
    try {
      let newRequest = await Request_Stock.create(req.body);
      res.status(200).send(newRequest);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  acceptRequest: async (req, res) => {
    try {
      console.log(req.params.id);
      let request = await Request_Stock.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Products,
            required: true,
          },
        ],
      });

      let warehouseRequestedId = request.dataValues.warehouseRequestedId;
      let warehouseRequestingId = request.dataValues.warehouseRequestingId;
      let productId = request.dataValues.productId;
      let quantity = request.dataValues.quantity;

      //Ubah inventory warehouse

      let getWarehouseRequestedId = await Warehouse_Products.findOne({
        where: { warehouseId: warehouseRequestedId, productId: productId },
      });
      let stockAmount = getWarehouseRequestedId.stock_reserved;
      let newStockAmount = stockAmount - quantity;

      await Warehouse_Products.update(
        {
          stock_reserved: newStockAmount,
        },
        {
          where: { id: getWarehouseRequestedId.id, productId: productId },
        }
      );
      //   ------------

      let getWarehouseRequestingId = await Warehouse_Products.findOne({
        where: { warehouseId: warehouseRequestingId, productId: productId },
      });
      let requestingStockAmount = getWarehouseRequestingId.stock_reserved;
      let newRequestingStockAmount = requestingStockAmount + quantity;

      await Warehouse_Products.update(
        {
          stock_reserved: newRequestingStockAmount,
        },
        {
          where: { id: getWarehouseRequestingId.id, productId: productId },
        }
      );
      let updateStatus = await Request_Stock.update(
        {
          status: "request approved",
        },
        { where: { id: req.params.id } }
      );
      res.status(200).send(updateStatus);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
