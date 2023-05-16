const service = require("../services/question_service");
const question = require("../models/question_schema");

exports.deleteQuestion = async (req, res) => {
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

exports.UpdateQuestion = async (req, res) => {
  try {
    const questionid = req.params.id;
    const questionBody = req.body;
    const question = await service.updateQuestion(questionid, questionBody);
    res.send(question);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
