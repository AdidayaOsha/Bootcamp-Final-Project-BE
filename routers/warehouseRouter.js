const router = require("express").Router();
const { warehouseController } = require("../controllers");

router.get("/", warehouseController.getWarehouses);
router.get("/:id", warehouseController.getWarehouseById);
router.post("/add", warehouseController.addWarehouse);
router.post("/addproduct", warehouseController.addProduct);
router.get("/product/:id", warehouseController.getWarehouseProductById);

module.exports = router;
