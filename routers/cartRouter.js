const router = require("express").Router();
const { cartController } = require("../controllers");

router.get("/get/:id", cartController.getUserCart);
router.get("/getpaymentoptions", cartController.getPaymentOptions);
router.get("/getpaymentoption/:id", cartController.getPaymentOptionById);
router.get("/getshipmentoptions", cartController.getShipmentOptions);
router.get("/getshipmentoption/:id", cartController.getShipmentOptionById);
router.patch("/quantity/:id", cartController.updateCartQty);
router.post("/add", cartController.addUserCart);
router.post("/checkout", cartController.submitCheckout);
router.post("/delete/:id", cartController.deleteUserCart);

module.exports = router;
