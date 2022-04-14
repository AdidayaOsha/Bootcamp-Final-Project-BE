const router = require("express").Router();
const { adminController } = require("../controllers");

router.get("/", adminController.getAdmins);
router.get("/:id", adminController.getAdminById);
router.post("/login", adminController.login);

module.exports = router;
