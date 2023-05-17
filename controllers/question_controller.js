const service = require("../services/question_service");

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
