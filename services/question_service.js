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
};
