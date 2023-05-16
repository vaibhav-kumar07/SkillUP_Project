const Question = require("../models/question_schema");
// const User = require("../model/userSchema");

// 1. first we create the question after that update the question.
exports.updateQuestion = async (questionId, updatedData) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      updatedData,
      { new: true }
    );
    if (!updatedQuestion) {
      return { success: false, message: "Question not found" };
    }
    return { success: true, updatedQuestion };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error updating question" };
  }
};

//2.first we create the question after that,we  update the question &  if you  want to delete the question.
exports.deleteQuestion = async (questionid) => {
  const questionExists = await Question.exists({ _id: questionid });

  if (!questionExists) {
    return { message: "Question not found" };
  }

  try {
    const deletedQuestion = await Question.findByIdAndDelete(questionid);
    return deletedQuestion;
  } catch {
    throw new Error("failed to delete question");
  }
};
