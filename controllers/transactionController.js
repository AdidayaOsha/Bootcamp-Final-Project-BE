const db = require("../db");
const Transactions = require("../models/Transactions");

module.exports = {
    getTransaction: async (req, res) => {
        Transactions.sync({ alter: true });
        try {
            res.status(200).send(req);
        } catch (err) {
            res.status(500).send(err);
        }
    },
};
