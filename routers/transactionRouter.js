const router = require("express").Router();
const { transactionController } = require("../controllers");

router.get("/", transactionController.getTransaction);
router.get("/:id", transactionController.getTransactionById);

module.exports = router;
