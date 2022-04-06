const router = require("express").Router();

const { productController } = require("../controllers");

router.get("/", productController.getProducts);
router.get("/search/:id", productController.getProductById);
router.post("/add", productController.addProduct);
router.patch("/update/:id", productController.editProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
