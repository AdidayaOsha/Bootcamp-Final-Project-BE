const db = require("../db");
const Invoice_Details = require("../models/Invoice_Details");
const Invoice_Headers = require("../models/Invoice_Headers");
const Products = require("../models/Products");
const Transactions = require("../models/Transactions");
const User_Addresses = require("../models/User_Addresses");
const Warehouses = require("../models/Warehouses");
const Warehouse_Products = require("../models/Warehouse_Products");

module.exports = {
    getTransaction: async (req, res) => {
        Transactions.sync({ alter: true });
        try {
            let allTransactions = await Transactions.findAll({
                include: [{
                    model: Invoice_Headers,
                    required: true,
                    include: [{
                        model: Invoice_Details,
                        required: true
                    },{
                        model: Warehouses,
                        required: true
                    },{
                        model: User_Addresses,
                        required: true
                    }]
                }]
            });
            res.status(200).send(allTransactions);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    getTransactionById: async (req, res) => {
        Transactions.sync({ alter: true });
        try {
            let id = req.params.id;
            let transactionsId = await Transactions.findOne({
                where: { id: id },
                include: [{
                    model: Invoice_Headers,
                    required: true,
                    include: [
                        {
                        model: Invoice_Details,
                        required: true,
                        include: [{
                            model: Products,
                            required: true
                        }]
                    },{
                        model:User_Addresses,
                        required:true
                    }
                ]
                }]
            });
  
            let warehouseId  = transactionsId.dataValues.invoice_header.warehouseId
            console.log(warehouseId);

            let warehouseInventory = await Warehouse_Products.findAll({
                where:{warehouseId:warehouseId }
            })

            let insufficientStock= false
            
            let transactionDetails = transactionsId.dataValues.invoice_header.invoice_details
            transactionDetails.map((transaction)=>{

                let productId=transaction.productId
                let itemInInventory

                warehouseInventory.map((item)=>{
                    if(item.productId==productId){
                        itemInInventory=item
                    }
                })

                if(itemInInventory.dataValues.stock_ready < transaction.quantity){
                    transaction.dataValues.status="Stock insufficient"
                    transaction.dataValues.requestStock=transaction.quantity-itemInInventory.dataValues.stock_ready
                    transaction.dataValues.warehouseStock=itemInInventory.dataValues.stock_ready
                    insufficientStock=true
                }else{
                    transaction.dataValues.status="Stock Ready"
                    transaction.dataValues.requestStock=0
                    transaction.dataValues.warehouseStock=itemInInventory.dataValues.stock_ready
                }

                if(insufficientStock){
                    transactionsId.status="request needed"
                }

            })

            console.log(transactionDetails)



            res.status(200).send(transactionsId);
        } catch (err) {
            res.status(500).send(err);
        }
    },
};
