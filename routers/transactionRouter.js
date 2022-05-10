const router = require("express").Router();
const { transactionController } = require("../controllers");

router.get("/", transactionController.getTransaction);

module.exports = router;
