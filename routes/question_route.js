const express = require("express");
const router = express.Router();
const {
  deleteQuestion,
  UpdateQuestion,
} = require("../controllers/question_controller");

// router.use(express.json());
router.route("/removeQuestion").delete(deleteQuestion);
router.route("/updateQuestion/:quesId/:userId").put(UpdateQuestion);

const router = express.Router();
const {
  createQuestion,
  getQuestion,
} = require("../controllers/question_controller");

router.use(express.json());

router.route("/createQuestion").post(createQuestion);

router.route("/getQuestion").get(getQuestion);

module.exports = router;
