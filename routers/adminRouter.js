const router = require("express").Router();
const { adminController } = require("../controllers");

router.get("/", adminController.getAdmins);
router.get("/:id", adminController.getAdminById);
// router.patch("/login", adminController.login);
// router.delete("/delete/:id", adminController.deleteUsersById);

module.exports = router;
