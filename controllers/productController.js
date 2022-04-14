const db = require("../db");
const Products = require("../models/Products");
const Product_Categories = require("../models/Product_Categories");
const Warehouse_Products = require("../models/Warehouse_Products");
const Warehouses = require("../models/Warehouses");
const { Op } = require("sequelize");
const sequelize = require("../lib/sequelize");

module.exports = {
  getProducts: async (req, res) => {
    Products.sync({ alter: true });
    try {
      let products = await Products.findAll({
        nested: true,
        limit: 10,
        include: [
          { model: Product_Categories },
          { model: Warehouse_Products, include: Warehouses },
        ],
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getProductsByPage: async (req, res) => {
    // Products.sync({ alter: true });
    try {
      let { page, size } = req.query;
      if (!page) {
        page = 1;
      }
      if (!size) {
        size = 4;
      }
      const limit = +size;
      const skip = (page - 1) * size;
      let products = await Products.findAll({
        nested: true,
        offset: skip,
        limit: limit,
        include: [
          { model: Product_Categories },
          { model: Warehouse_Products, include: Warehouses },
        ],
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getProductById: async (req, res) => {
    Products.sync({ alter: true });
    try {
      let id = req.params.id;
      let product = await Products.findAll({
        where: { id: id },
        include: [
          { model: Product_Categories },
          { model: Warehouse_Products, include: Warehouses },
        ],
      });

      res.status(200).send(product);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addProduct: async (req, res) => {
    Products.sync({ alter: true });
    try {
      let data = {
        //use file to upload only a single image, not files.
        product_image: req.file.path,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        productCategoryId: req.body.productCategoryId,
      };
      const product = await Products.create(data);
      await product.createWarehouse_product({
        stock_ready: req.body.stock_ready,
        warehouseId: req.body.warehouseId,
        productId: product.id,
      });
      res.status(200).send(product);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  updateProduct: async (req, res) => {
    // Products.sync({ alter: true });
    try {
      let id = req.params.id;
      const products = await Products.update(req.body, { where: { id: id } });
      const products2 = await Warehouse_Products.update(req.body, {
        where: { id: id },
      });
      res.status(200).send({ products, products2 });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteProduct: async (req, res) => {
    Products.sync({ alter: true });
    try {
      let id = req.params.id;
      await Products.destroy({ where: { id: id } });
      res.status(200).send("product is deleted");
    } catch (err) {
      res.status(500).send(err);
    }
  },
  searchProduct: async (req, res) => {
    Products.sync({ alter: true });
    try {
      let product = await Products.findAll({
        include: [
          { model: Product_Categories },
          { model: Warehouse_Products, include: Warehouses },
        ],
        where: {
          name: {
            [Op.substring]: req.body.name,
          },
        },
      });
      res.status(200).send(product);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  },
  onSortNameAsc: async (req, res) => {
    try {
      // Products.sync({ alter: true });
      let products = await Products.findAll({
        include: [
          { model: Product_Categories },
          { model: Warehouse_Products, include: Warehouses },
        ],
        order: [["name", "ASC"]],
      });
      res.status(200).send(products);
    } catch (err) {
      console.log(`message: ${message.err}`);
      res.status(500).send(err);
    }
  },
  onSortNameDesc: async (req, res) => {
    try {
      let products = await Products.findAll({
        include: [
          { model: Product_Categories },
          { model: Warehouse_Products, include: Warehouses },
        ],
        order: [["name", "DESC"]],
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  onSortPriceAsc: async (req, res) => {
    try {
      let price = await Products.findAll({
        include: [
          { model: Product_Categories },
          { model: Warehouse_Products, include: Warehouses },
        ],
        order: [["price", "ASC"]],
      });
      res.status(200).send(price);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  onSortPriceDesc: async (req, res) => {
    try {
      let price = await Products.findAll({
        include: [
          { model: Product_Categories },
          { model: Warehouse_Products, include: Warehouses },
        ],
        order: [["price", "DESC"]],
      });
      res.status(200).send(price);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getCategories: async (req, res) => {
    // Product_Categories.sync({ alter: true });
    try {
      let categories = await Product_Categories.findAll({});
      res.status(200).send(categories);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addProductCategory: async (req, res) => {
    // Product_Categories.sync({ alter: true });
    try {
      let data = {
        name: req.body.name,
        description: req.body.description,
      };

      const productCategory = await Product_Categories.create(data);
      res.status(200).send(productCategory);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getWarehouses: async (req, res) => {
    // Warehouses.sync({ alter: true });
    try {
      let warehouses = await Warehouses.findAll({});
      res.status(200).send(warehouses);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
