const mongoose = require("mongoose");

exports.createNewUser = async function (user) {
  try {
    console.log("In auth service");
    let result = await user.save();
    const user_id = result._id;
    return user_id;
  } catch (err) {
    throw { message: "user cannot be created" };
  }
};
