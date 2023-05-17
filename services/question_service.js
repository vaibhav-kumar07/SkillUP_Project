const Question = require("../models/question_schema");
const User = require("../models/user_schema");

exports.createQuestion = async (_id, title, options, answer, type) => {
  await verifyUser(_id);
  console.log(`in queston creation`);
  const ques = new Question({ title, options, answer, type });
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
