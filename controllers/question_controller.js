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
