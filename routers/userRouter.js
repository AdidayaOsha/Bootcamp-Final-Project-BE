const router = require("express").Router();
const { userController } = require("../controllers");
const { auth } = require('../helper/authToken')

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/register", userController.register);
router.patch("/verification", auth, userController.verification);
router.post("/login", userController.login);
router.post("/auth", auth, userController.getDataUser);
router.post("/forgotpassword", userController.forgotPassword);
router.patch("/update/:id", userController.updateStatus);

module.exports = router;
