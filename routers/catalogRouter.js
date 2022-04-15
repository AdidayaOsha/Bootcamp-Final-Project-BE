const router = require("express").Router();
const { catalogController } = require("../controllers");

router.get("/", catalogController.getProducts);
router.get("/:id", catalogController.getProductById);
router.post("/search", catalogController.getProductByName);
router.get("/categories", catalogController.getProducts);
router.get("/category/:id", catalogController.getCategoryById);
router.get("/sort/az", catalogController.sortAZ);
router.get("/sort/za", catalogController.sortZA);
router.get("/sort/highprice", catalogController.highPrice);
router.get("/sort/lowprice", catalogController.lowPrice);

module.exports = router;
