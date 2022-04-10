const db = require("../db");
const Products = require("../models/Products");
const Product_Categories = require("../models/Product_Categories");

module.exports = {
  getProducts: async (req, res) => {
    Products.sync({ alter: true });
    try {
      let products = await Products.findAll({
        include: {
          model: Product_Categories,
          // showing only the name that you want to view
          attributes: ["name", "description"],
        },
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
        //use file to upload only a single image, not files.
        product_image: req.file.path,
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
  getCategories: async (req, res) => {
    Products.sync({ alter: true });
    try {
      let categories = await Product_Categories.findAll({});
      res.status(200).send(categories);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addProductCategory: async (req, res) => {
    Product_Categories.sync({ alter: true });
    try {
      let data = {
        name: req.body.name,
        description: req.body.description,
      };

      const product = await Product_Categories.create(data);
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
