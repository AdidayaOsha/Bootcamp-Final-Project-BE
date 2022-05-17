const router = require("express").Router();
const { testingController } = require("../controllers");

router.get("/", testingController.getTransaction);
router.get("/:id/getTransaction", testingController.getTransactionById);
router.get("/getRequest", testingController.getRequest);
module.exports = router;
