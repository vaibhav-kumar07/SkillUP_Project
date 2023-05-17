const service = require("../services/question_service");

// const question = require("../models/question_schema");

const deleteQuestion = async (req, res) => {
  try {
    // const userid = req.body;
    // console.log(userid);
    const { questionid } = req.body;
    console.log(questionid);
    await service.deleteQuestion(questionid);
    res.status(201).json({ message: "question deleted succesfully" });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const UpdateQuestion = async (req, res) => {
  try {
    const questionid = req.params.quesId;
    const userId = req.params.userId;
    const { Title, Answer } = req.body;
    const question = await service.updateQuestion(questionid, {
      Title,
      Answer,
      userId,
      questionid,
    });
    res.status(200).send(question);
  } catch (error) {
    // console.error(error);
    res.status(400).send({ message: error.message });
  }
};
module.exports = { deleteQuestion, UpdateQuestion };


exports.createQuestion = async (req, res) => {
  console.log("question created here");
  try {
    const { Title, Options, Answer, Type } = req.body;
    const { _id } = req.query;
    await service.createQuestion(_id, Title, Options, Answer, Type);
    res.status(200).send({ msg: "question Added in question bank" });
  } catch (error) {
    console.log("error during question Creation :", error);
    res.status(400).send({ message: error.message });
  }
};

exports.getQuestion = async (req, res) => {
  console.log("question getting  here");
  try {
    let all = await service.getQuestion();
    res.status(200).send(all);
  } catch (error) {
    console.log("error during question Creation :", error);
    res.status(400).send({ message: error.message });
  }
};

