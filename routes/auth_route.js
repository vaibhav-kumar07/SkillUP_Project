const express = require("express");
const router = express.Router();
const {
  createUser,
  userLogin,
  UserloginViaToken,
} = require("../controllers/auth_controller");

router.route("/signUp").post(createUser);
router.route("/login").post(userLogin);
router.route("/login/token").post(UserloginViaToken);
module.exports = router;
