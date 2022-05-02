const db = require("../db");
const Products = require("../models/Products");
const Product_Categories = require("../models/Product_Categories");
const Warehouse_Products = require("../models/Warehouse_Products");
const Warehouses = require("../models/Warehouses");
const { Op } = require("sequelize");
const sequelize = require("../lib/sequelize");

module.exports = {
  getWarehouses: async (req, res) => {
    Warehouses.sync({ alter: true });
    try {
      let warehouses = await Warehouses.findAll({});
      res.status(200).send(warehouses);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getWarehouseById: async (req, res) => {
    Warehouses.sync({ alter: true });
    try {
      let id = req.params.id;
      let warehouses = await Warehouses.findAll({
        where: { id: id },
      });
      res.status(200).send(warehouses);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addWarehouse: async (req, res) => {
    Warehouses.sync({ alter: true });
    try {
      let data = {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postal_code: req.body.postal_code,
      };
      const warehouse = await Warehouses.create(data);
      res.status(200).send(warehouse);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(req.file);
  },
  addProduct: async (req, res) => {
    // Warehouses.sync({ alter: true });
    try {
      let data = {
        stock_ready: req.body.stock_ready,
        stock_reserved: req.body.stock_reserved,
        warehouseId: req.body.warehouseId,
        productId: req.body.productId,
      };
      const warehouse = await Warehouse_Products.create(data);
      res.status(200).send(warehouse);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(req.file);
  },
  getWarehouseProductById: async (req, res) => {
    Warehouse_Products.sync({ alter: true });
    try {
      let id = req.params.id;
      let warehouses = await Warehouse_Products.findAll({
        where: { warehouseId: id },
        include: [
           {model: Products}, 
        ]
      });
      res.status(200).send(warehouses);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
