const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/auth_controller");

router.route("/signUp").post(createUser);

module.exports = router;
