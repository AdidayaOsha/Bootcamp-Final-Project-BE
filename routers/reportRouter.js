const router = require("express").Router();
const { reportController } = require("../controllers");

router.get("/products", reportController.getAllProducts);
router.post("/topproducts", reportController.getTopProducts);
router.get("/paymentmethods", reportController.getAllPaymentMethod);
router.get("/order", reportController.getOrdersToday);
router.get("/register", reportController.getNewUsersToday);
router.get("/sales", reportController.getSalesToday);

router.get("/sort/newestordertime", reportController.orderTime);
router.get("/sort/newestendtime", reportController.endTime);
router.get("/sort/highprofit", reportController.highRevenue);
router.get("/sort/lowprofit", reportController.lowRevenue);
// router.post("/sort/warehouse", catalogController.getTransactionsByWarehouse);

router.post("/transactions", reportController.getAllTransactions);
router.post("/summary", reportController.getSummary);

module.exports = router;
