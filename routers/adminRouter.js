const router = require("express").Router();
const { adminController } = require("../controllers");
const { auth } = require('../helper/authToken')

router.get("/", adminController.getAdmins);
router.get("/:id", adminController.getAdminById);
router.post("/register", adminController.register);
router.patch("/verification", auth, adminController.verification);
router.post("/login", adminController.login);
router.post("/auth", auth, adminController.getDataAdmin);
router.post("/forgotpassword", adminController.forgotPassword);
router.patch("/recoverpassword", auth, adminController.recoverPassword);

module.exports = router;
