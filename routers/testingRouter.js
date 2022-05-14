const router = require("express").Router();
const { testingController } = require("../controllers");

router.get("/", testingController.getTransaction);
router.get("/:id", testingController.getTransactionById);

module.exports = router;
