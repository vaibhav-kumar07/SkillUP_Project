const User = require("../models/user_schema");

getUserByEmail = async function (email) {
  try {
    const emailid = email;
    let result = await User.findOne({ email: emailid });
    if (!result) throw new Error("Invalid Email!!!!!!!");
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserByEmail };
