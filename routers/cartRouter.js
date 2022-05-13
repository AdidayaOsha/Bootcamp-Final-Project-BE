const router = require("express").Router();
const { cartController } = require("../controllers");
const { upload_payment_proof } = require("../lib/multer");

router.post(
  "/addpaymentproof",
  upload_payment_proof,
  cartController.addPaymentProof
);
router.get("/get/:id", cartController.getUserCart);
router.get("/getpaymentoptions", cartController.getPaymentOptions);
router.get("/getpaymentoption/:id", cartController.getPaymentOptionById);
router.get("/getshipmentoptions", cartController.getShipmentOptions);
router.get("/getshipmentoption/:id", cartController.getShipmentOptionById);
router.get("/getinvoiceheader/:id", cartController.getInvoiceHeader);
router.get("/getpaymentproof/:id", cartController.getPaymentProof);
router.patch("/quantity/:id", cartController.updateCartQty);
router.post("/add", cartController.addUserCart);
router.post("/checkout", cartController.submitCheckout);
router.post("/delete/:id", cartController.deleteUserCart);

module.exports = router;
