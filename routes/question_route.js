const express = require("express");
const router = express.Router();
const {
  deleteQuestion,
  UpdateQuestion,
} = require("../controllers/question_controller");

router.route("/removeQuestion").delete(deleteQuestion);
router.route("/updateQuestion/:id").put(UpdateQuestion);

module.exports = router;
