const service = require("../services/question_service");
const question = require("../models/question_schema");
const User = require("../models/user_schema");

exports.createQuestion = async (req, res) => {
  console.log("question created here");
  try {
    const { title, options, answer, type } = req.body;
    const { _id } = req.query;
    await service.createQuestion(_id, title, options, answer, type);
    res.status(200).send({ msg: "question Added in question bank" });
  } catch (error) {
    console.log("error during question Creation :", error);
    res.status(400).send({ message: error.message });
  }
};
