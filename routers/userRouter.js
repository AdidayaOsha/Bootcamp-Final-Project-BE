const router = require("express").Router();
const { userController } = require("../controllers");
const { auth } = require('../helper/authToken')

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/register", userController.register);
router.patch("/verification", auth, userController.verification);
// router.patch("/login", userController.login);
// router.delete("/delete/:id", userController.deleteUsersById);

module.exports = router;
