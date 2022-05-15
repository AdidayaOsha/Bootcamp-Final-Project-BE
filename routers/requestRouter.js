const router = require("express").Router();
const { requestController } = require("../controllers");

router.get("/getRequest", requestController.getRequest);
router.post("/", requestController.postRequest);
module.exports = router;
