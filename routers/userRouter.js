const router = require("express").Router();
const { userController } = require("../controllers");
const { auth } = require("../helper/authToken");

router.get("/", userController.getUsers);
router.get("/get/:id", userController.getUserById);
router.get("/provinces", userController.getProvinces);
router.get("/province/:id", userController.getProvince);
router.get("/city/:id", userController.getCity);
router.get("/district/:id", userController.getDistrict);
router.get("/cities/:id", userController.getCitiesByProvinceId);
router.get("/districts/:id", userController.getDistrictsByCityId);
router.post("/register", userController.register);
router.patch("/verification", auth, userController.verification);
router.post("/login", userController.login);
router.post("/auth", auth, userController.getDataUser);
router.post("/forgotpassword", userController.forgotPassword);
router.patch("/recoverpassword", auth, userController.recoverPassword);
router.post("/newaddress", userController.addUserAddress);
router.get("/getaddresses/:id", userController.getAddressesByUserId);
router.get("/getaddress/:id", userController.getAddressById);
router.get("/getdefaultaddress", userController.getDefaultAddress);
router.patch("/updatedefaultaddress", userController.updateDefaultAddress);
router.delete("/deleteaddress/:id", userController.deleteUserAddress);

module.exports = router;
