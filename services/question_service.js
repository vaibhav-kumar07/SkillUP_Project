const Question = require("../models/question_schema");

// const User = require("../model/userSchema");

// 1. first we create the question after that update the question.
exports.updateQuestion = async (
  questionId,
  { Title, Answer, userId, questionid }
) => {
  try {
    const question = await Question.findById(questionid);
    console.log(userId, question.user);
    if (!(question.user == userId))
      throw new Error("invalid user to update a question");
    console.log(question.user == userId);
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { Title, Answer },
      { new: true }
    );
    if (!updatedQuestion) {
      return { success: false, message: "Question not found" };
    }
    return { success: true, updatedQuestion };
  } catch (error) {
    throw error;
    // console.error(error);
    // return { success: false, message: "Error updating question" };
  }
};

//2.first we create the question after that,we  update the question &  if you  want to delete the question.

exports.deleteQuestion = async (questionid) => {
  const questionExists = await Question.exists({ _id: questionid });
  try {
    const deletedQuestion = await Question.findByIdAndDelete(questionid);
    return deletedQuestion;
  } catch {
    throw new Error("failed to delete question");
  }

const User = require("../models/user_schema");

exports.createQuestion = async (_id, Title, Options, Answer, Type) => {
  await verifyUser(_id);
  console.log(_id);
  console.log(`in queston creation`);
  const ques = new Question({ Title, Options, Answer, Type });
  await ques.save();
  console.log("question created successfully ");
  return ques;
};

verifyUser = async function (_id) {
  console.log(`in verifying the question `);
  let user = await User.findById(_id);
  console.log(user);
  if (!user) throw new Error("User not found");
  if (!user.token)
    throw new Error("You are not logged in. Please login to continue");
  if (user.isAdmin === false)
    throw new Error("You are unauthorized to create a question");
};

exports.getQuestion = async () => {
  await Question.find({}, { _id: 0, __v: 0, type: 0 });

};
