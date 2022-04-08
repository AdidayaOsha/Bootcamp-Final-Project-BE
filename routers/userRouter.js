const router = require("express").Router();
const { userController } = require("../controllers");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/register", userController.register);
// router.patch("/login", userController.login);
// router.patch("/verification", userController.verification);
// router.delete("/delete/:id", userController.deleteUsersById);

module.exports = router;
