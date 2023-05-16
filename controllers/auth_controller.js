const auth_service = require("../services/auth_service");
const User = require("../models/user_schema");

exports.createUser = async function (req, res) {
  try {
    console.log("In auth controller");
    const { userName, email, password, role, phoneNumber } = req.body;
    let id = await auth_service.createNewUser({
      userName,
      email,
      password,
      role,
      phoneNumber,
    });
    res.status(201).send({ message: "successfully created a new User", id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
