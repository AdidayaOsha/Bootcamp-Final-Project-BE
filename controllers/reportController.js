const sequelize = require("../lib/sequelize");
const Invoice_Details = require("../models/Invoice_Details");
const Invoice_Headers = require("../models/Invoice_Headers");
const Transactions = require("../models/Transactions");
const Products = require("../models/Products");
const Users = require("../models/Users");
const Payment_Options = require("../models/Payment_Options");
const Shipment_Masters = require("../models/Shipment_Masters");
const { Op } = require("sequelize");

module.exports = {
    getAllProducts: async (req, res) => {
        try {
            let date = new Date(Date.now());
            let nextdate = new Date(Date.now() + (3600 * 1000 * 24));
            let products = await Products.findAll({
                attributes: [
                    'name',
                    'id',
                    [
                        sequelize.literal(`(SELECT SUM(quantity) FROM invoice_details WHERE products.id = invoice_details.productId)`),
                        'total',
                    ],
                ],
            });
            res.status(200).send(products);
        } catch (err) {
            res.status(500).send(err);
            console.log(err)
        }
    },
    getTopProducts: async (req, res) => {
        try {
            // let date = new Date(Date.now() - (3600 * 1000 * 24));
            // let nextdate = new Date(Date.now() + (3600 * 1000 * 24));
            const products = await Products.findAll({
                attributes: [
                    'name',
                    'id',
                    [
                        sequelize.literal(`(SELECT SUM(quantity) FROM invoice_details WHERE products.id = invoice_details.productId)`),
                        'total',
                    ],
                ],
                order: [
                    [sequelize.literal('`total` DESC')]
                ],
                // where: {
                //     createdAt: {
                //         [Op.gt] : date,
                //         [Op.lt] : nextdate,
                //     }
                // },
                limit: 3
            })
            res.status(200).send(products);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    getAllPaymentMethod: async (req, res) => {
        try {
            let date = new Date(Date.now() - (3600 * 1000 * 24));
            let nextdate = new Date(Date.now() + (3600 * 1000 * 24));
            const payment = await Payment_Options.findAll({
                attributes: [
                    'name',
                    'id',
                    [
                        sequelize.literal(`(SELECT COUNT(id) FROM invoice_headers WHERE payment_options.id = invoice_headers.paymentOptionId)`),
                        'total',
                    ],
                ],
                where: {
                    createdAt: {
                        [Op.gt] : date,
                        [Op.lt] : nextdate,
                    }
                },
            })

            res.status(200).send(payment);
        } catch (err) {
            res.status(500).send(err);
            console.log(err)
        }
    },
    getOrdersToday: async (req, res) => {
        try {
            let date = new Date(Date.now() - (3600 * 1000 * 24));
            let nextdate = new Date(Date.now() + (3600 * 1000 * 24));
            const sales = await Transactions.findAndCountAll({
                where: {
                    status: "approved request",
                    createdAt: {
                        [Op.gt] : date,
                        [Op.lt] : nextdate,
                    }
                },
                attributes: [
                    [
                        sequelize.literal(`(SELECT SUM(total) FROM invoice_headers WHERE transactions.invoiceHeaderId = invoice_headers.id AND transactions.status = "approved request")`),
                        'total',
                    ],
                ],
            });
            res.status(200).send(sales);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    getNewUsersToday: async (req, res) => {
        try {
            let date = new Date(Date.now() - (3600 * 1000 * 24));
            let nextdate = new Date(Date.now() + (3600 * 1000 * 24));
            const users = await Users.findAndCountAll({
                where: {
                    is_active: 1,
                    createdAt: {
                        [Op.gt] : date,
                        [Op.lt] : nextdate,
                    }
                }
            });
            res.status(200).send(users);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    getSalesToday: async (req, res) => {
        try {
            let date = new Date(Date.now() - (3600 * 1000 * 24));
            let nextdate = new Date(Date.now() + (3600 * 1000 * 24));
            const sales = await Transactions.findAndCountAll({
                where: {
                    status: "approved request",
                    createdAt: {
                        [Op.gt] : date,
                        [Op.lt] : nextdate,
                    }
                }
            });
            res.status(200).send(sales);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    orderTime: async (req, res) => {
        try {
            let products = await Transactions.findAll({
                attributes: [
                    'createdAt',
                    'updatedAt',
                    'status',
                    'number',
                ],
                order: [
                    ['createdAt', 'DESC'],
                ],
                where: { 
                    status: 'approved request',
                    // createdAt: {
                    //     [Op.gte] : req.body.date,
                    //     [Op.lte] : req.body.enddate,
                    // }
                 },
                include: [
                    {   model: Invoice_Headers,
                        required: true,
                        attributes: [
                            'total',
                            'status'
                        ],
                        include: [
                            {
                                model: Shipment_Masters,
                                required: true,
                                attributes: [
                                    'name',
                                    'price'
                                ],
                            },
                            {
                                model: Payment_Options,
                                required: true,
                                attributes: [
                                    'name',
                                ],
                            },
                            {
                                model: Users,
                                required: true,
                                attributes: [
                                    'username',
                                ],
                            }
                        ]
                    },
                  ],
            });
            res.status(200).send(products);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    endTime: async (req, res) => {
        try {
            let products = await Transactions.findAll({
                attributes: [
                    'createdAt',
                    'updatedAt',
                    'status',
                    'number',
                ],
                order: [
                    ['updatedAt', 'DESC'],
                ],
                where: { 
                    status: 'approved request',
                    // createdAt: {
                    //     [Op.gte] : req.body.date,
                    //     [Op.lte] : req.body.enddate,
                    // }
                 },
                include: [
                    {   model: Invoice_Headers,
                        required: true,
                        attributes: [
                            'total',
                            'status'
                        ],
                        include: [
                            {
                                model: Shipment_Masters,
                                required: true,
                                attributes: [
                                    'name',
                                    'price'
                                ],
                            },
                            {
                                model: Payment_Options,
                                required: true,
                                attributes: [
                                    'name',
                                ],
                            },
                            {
                                model: Users,
                                required: true,
                                attributes: [
                                    'username',
                                ],
                            }
                        ]
                    },
                  ],
            });
            res.status(200).send(products);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    highRevenue: async (req, res) => {
        try {
            let products = await Transactions.findAll({
                attributes: [
                    'createdAt',
                    [
                        sequelize.literal(`(SELECT invoice_headers.total FROM invoice_headers LEFT JOIN shipment_masters ON shipment_masters.id = invoice_headers.shipmentMasterId)`),
                        'revenue',
                    ],
                ],
                order: [
                    [sequelize.literal('`revenue` DESC')]
                ],
                where: { 
                    status: 'approved request',
                    // createdAt: {
                    //     [Op.gte] : req.body.date,
                    //     [Op.lte] : req.body.enddate,
                    // }
                 },
            });
            res.status(200).send(products);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    lowRevenue: async (req, res) => {
        try {
            let products = await Transactions.findAll({
                attributes: [
                    'createdAt',
                    [
                        sequelize.literal(`(SELECT SUM(invoice_headers.total - shipment_masters.id) FROM invoice_headers LEFT JOIN shipment_masters ON shipment_masters.id = invoice_headers.shipmentMasterId)`),
                        'revenue',
                    ],
                ],
                order: [
                    [sequelize.literal('`revenue` ASC')]
                ],
                where: { 
                    status: 'approved request',
                    // createdAt: {
                    //     [Op.gte] : req.body.date,
                    //     [Op.lte] : req.body.enddate,
                    // }
                 },
            });
            res.status(200).send(warehouses);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    getTransactionsByWarehouse: async (req, res) => {
        try {
            
            res.status(200).send(warehouses);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    getAllTransactions: async (req, res) => {
        try {
            let products = await Transactions.findAll({
                attributes: [
                    'createdAt',
                    'updatedAt',
                    'status',
                    'number',
                ],
                where: { 
                    status: 'approved request',
                    // createdAt: {
                    //     [Op.gte] : req.body.date,
                    //     [Op.lte] : req.body.enddate,
                    // }
                 },
                include: [
                    {   model: Invoice_Headers,
                        required: true,
                        attributes: [
                            'total',
                            'status'
                        ],
                        include: [
                            {
                                model: Shipment_Masters,
                                required: true,
                                attributes: [
                                    'name',
                                    'price'
                                ],
                            },
                            {
                                model: Payment_Options,
                                required: true,
                                attributes: [
                                    'name',
                                ],
                            },
                            {
                                model: Users,
                                required: true,
                                attributes: [
                                    'username',
                                ],
                            }
                        ]
                    },
                  ],
            });
            res.status(200).send(products);
        } catch (err) {
            res.status(500).send(err);
            console.log(err)
        }
    },
    getSummary: async (req, res) => {
        try {
            let products = await Transactions.findAll({
                attributes: [
                    'createdAt',
                    [
                        sequelize.literal(`(SELECT SUM(invoice_headers.total - shipment_masters.id) FROM invoice_headers LEFT JOIN shipment_masters ON shipment_masters.id = invoice_headers.shipmentMasterId)`),
                        'revenue',
                    ],
                ],
                where: { 
                    status: 'approved request',
                    // createdAt: {
                    //     [Op.gte] : req.body.date,
                    //     [Op.lte] : req.body.enddate,
                    // }
                 },
            });
            res.status(200).send(products);
        } catch (err) {
            res.status(500).send(err);
            console.log(err)
        }
    },
};
