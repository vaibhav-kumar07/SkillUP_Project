const authService = require("../services/auth_service");
const userService = require("../services/user_service");
const createUser = async function (req, res) {
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

const userLogin = async function (req, res) {
  try {
    const { email, password, otp } = req.body;
    if (otp) {
      await authService.verifyOtp(email, otp);
      await authService.makeUserActive(email);
    }
    const user = await userService.getUserByEmail(email);
    if (!user) throw new Error("User does not exist");
    await authService.verifyPassword(password, user.password);
    const Token = await authService.generateToken(email);
    await authService.updateToken(user._id, Token);
    if (!user.isActive) {
      await authService.generateOtp(email);
      return res
        .status(200)
        .send({ msg: "New User!!!!verify Otp send via email and phone" });
    }
    return res
      .status(200)
      .send({ message: "User logged in successfully", Token });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const UserloginViaToken = async function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await authService.verifyToken(token);
    return res.status(200).send({ message: "User Logged in Successfully" });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { createUser, userLogin, UserloginViaToken };
