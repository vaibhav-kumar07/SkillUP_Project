const express = require("express");
const router = express.Router();
const {
  deleteQuestion,
  UpdateQuestion,
} = require("../controllers/question_controller");

// router.use(express.json());
router.route("/removeQuestion").delete(deleteQuestion);
router.route("/updateQuestion/:quesId/:userId").put(UpdateQuestion);

module.exports = router;
