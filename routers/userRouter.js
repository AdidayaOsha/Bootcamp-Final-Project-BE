const router = require("express").Router();
const { userController } = require("../controllers");
const { auth } = require("../helper/authToken");

router.get("/", userController.getUsers);
router.get("/get/:id", userController.getUserById);
router.get("/provinces", userController.getProvinces);
router.get("/cities/:id", userController.getCitiesByProvinceId);
router.get("/districts/:id", userController.getDistrictsByCityId);
router.post("/register", userController.register);
router.patch("/verification", auth, userController.verification);
router.post("/login", userController.login);
router.post("/auth", auth, userController.getDataUser);
router.post("/forgotpassword", userController.forgotPassword);
router.patch("/update/:id", userController.updateStatus);
router.patch("/recoverpassword", auth, userController.recoverPassword);
router.post("/newaddress", userController.addUserAddress);

module.exports = router;
