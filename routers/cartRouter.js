const router = require("express").Router();
const { cartController } = require("../controllers");

router.get("/get/:id", cartController.getUserCart);
router.get("/getshipments", cartController.getShipments);
router.get("/getpaymentoptions", cartController.getPaymentOptions);
router.patch("/quantity/:id", cartController.updateCartQty);
router.post("/add", cartController.addUserCart);
router.delete("/delete/:id", cartController.deleteUserCart);

module.exports = router;
