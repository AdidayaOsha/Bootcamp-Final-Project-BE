const router = require("express").Router();
const { adminProductController } = require("../controllers");

router.get("/getproducts", adminProductController.getProducts);
router.get("/getproduct/:id", adminProductController.getProductById);
router.post("/addproduct", adminProductController.addProduct);
router.patch("/editproduct/:id", adminProductController.editProduct);
router.delete("/deleteproduct/:id", adminProductController.deleteProduct);

module.exports = router;
