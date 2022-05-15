const router = require("express").Router();
const { requestController } = require("../controllers");

router.get("/getRequest", requestController.getRequest);
router.get("/getRequest/:id", requestController.getRequestById);
router.post("/", requestController.postRequest);
router.post("/:id/acceptRequest", requestController.acceptRequest);
module.exports = router;
