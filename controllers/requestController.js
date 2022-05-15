const db = require("../db");
const Products = require("../models/Products");
const Request_Stock = require("../models/Request_Stock");

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
  postRequest: async (req, res) => {
    try {
      let newRequest = await Request_Stock.create(req.body);
      res.status(200).send(newRequest);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
