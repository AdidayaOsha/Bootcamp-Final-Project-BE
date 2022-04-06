const db = require("../db");
const Products = require("../models/Products");
const Products_Categories = require("../models/Product_Categories");

module.exports = {
  getProducts: async (req, res) => {
    Products.sync({ alter: true });
    try {
      let products = await Products.findAll(
        {},
        {
          includes: [Products_Categories],
        }
      );
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getProductById: async (req, res) => {
    Products.sync({ alter: true });
    try {
      let id = req.params.id;
      let product = await Products.findOne({ where: { id: id } });
      res.status(200).send(product);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addProduct: async (req, res) => {
    Products.sync({ alter: true });
    try {
      let data = {
        product_image: req.body.filepath,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        id_category: req.body.id_category,
        is_deleted: req.body.is_deleted,
      };

      const product = await Products.create(data);
      res.status(200).send(product);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  editProduct: async (req, res) => {
    Products.sync({ alter: true });
    try {
      let id = req.params.id;
      const products = await Products.update(req.body, { where: { id: id } });
      res.status(200).send(products);
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
};
