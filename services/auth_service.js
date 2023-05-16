const mongoose = require("mongoose");
const User = require("../models/user_schema");
exports.createNewUser = async function (userName, email, password, role) {
  try {
    console.log("In auth service");
    let user = new User(userName, email, password, role);
    let result = await user.save();
    const user_id = result._id;
    return user_id;
  } catch (error) {
    throw { message: `user cannot be created${error.message}` };
  }
};
