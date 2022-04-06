const express = require("express");
const router = express.Router();
const { adminController } = require("../controllers");

router.get("/getproduct", adminController.getProducts);
router.get("/getproduct/:id", adminController.getProductById);
router.post("/addproduct", adminController.addProduct);
router.patch("/editproduct", adminController.editProduct);
router.delete("/deleteproduct", adminController.deleteProduct);

module.exports = router;
