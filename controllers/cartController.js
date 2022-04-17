const db = require("../db");
const Cart = require("../models/Carts")
const Users = require("../models/Users")
const Products = require("../models/Products")

module.exports = {
  getUserCart: (req, res) => {},
  updateUserCart: (req, res) => {},
  addUserCart: async (req, res) => {
    Cart.sync({alter:true});
    try {
      let data = {
        quantity: req.body.quantity,
        userId: req.body.userId,
        productId: req.body.productId,
      }
      const cart = await Cart.create(data);
      res.status(200).send(cart)
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(req.file)
  },
  deleteUserCart: (req, res) => {},
};
