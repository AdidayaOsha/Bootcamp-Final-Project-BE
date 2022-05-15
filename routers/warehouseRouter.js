const router = require("express").Router();
const { warehouseController } = require("../controllers");

router.get("/", warehouseController.getWarehouses);
router.get("/:id", warehouseController.getWarehouseById);
router.post("/add", warehouseController.addWarehouse);
router.patch("/update/:id", warehouseController.updateWarehouse);
router.get("/product/:id", warehouseController.getWarehouseProductById);
router.post("/addproduct", warehouseController.addProduct);
router.patch("/updateproduct/:id", warehouseController.updateProduct);
router.delete("/deleteproduct/:id", warehouseController.deleteProduct);
router.get("/shipping/:id", warehouseController.getShippingById);
router.post("/addshipping", warehouseController.addShipping);
router.patch("/updateshipping/:id", warehouseController.updateShipping);
router.delete("/deleteshipping/:id", warehouseController.deleteShipping);
router.get("/opcost/:id", warehouseController.getOperationalCost);
router.post("/addopcost", warehouseController.addOperationalCost);
router.patch("/updaopcost/:id", warehouseController.updateOperationalCost);
router.delete("/deleteopcost/:id", warehouseController.deleteOperationalCost);

module.exports = router;
