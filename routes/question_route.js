const express = require("express");

const router = express.Router();
const {
  createQuestion,
  getQuestion,
} = require("../controllers/question_controller");

router.use(express.json());

router.route("/createQuestion").post(createQuestion);
router.route("/getQuestion").post(getQuestion);
module.exports = router;
