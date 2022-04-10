const router = require("express").Router();
const { productController } = require("../controllers");
const upload = require("../lib/multer");

router.get("/", productController.getProducts);
router.get("/search/:id", productController.getProductById);
router.post("/add", upload, productController.addProduct);
router.post("/addcategory", productController.addProductCategory);
router.patch("/update/:id", productController.editProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
