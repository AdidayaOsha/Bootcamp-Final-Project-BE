const router = require("express").Router();
const { transactionController } = require("../controllers");

router.get("/", transactionController.getTransaction);
router.get("/:id", transactionController.getTransactionById);
router.post("/:id", transactionController.checkStock);
router.patch("/:id", transactionController.changeTransactionStatus);

module.exports = router;
