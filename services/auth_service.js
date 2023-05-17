const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("twilio")(
  process.env.ACCOUNT_SSID,
  process.env.AUTH_KEY
);
const User = require("../models/user_schema");

const userService = require("../services/user_service");


exports.createNewUser = async function (
  userName,
  email,
  password,
  role,
  phoneNumber
) {
  try {
    console.log("In auth service");
    let user = new User(userName, email, password, role, phoneNumber);
    let result = await user.save();
    const user_id = result._id;
    return user_id;
  } catch (error) {
    throw { message: `user cannot be created :-${error.message}` };
  }
};

const verifyToken = async function (token) {
  const getEmailByToken = await User.findOne({ token });
  if (!getEmailByToken) throw new Error("access denied");
  const result = await jwt.verify(token, process.env.SECRETKEY);
  if (result !== getEmailByToken.email) throw new Error("Invalid token");
  return result;
};

const verifyOtp = async function (email, OTP) {
  const user = await userService.getUserByEmail(email);
  if (!(user.otp == OTP)) throw new Error("invalid otp");
  return user;
};

const makeUserActive = async function (email) {
  const user = await userService.getUserByEmail(email);
  let result = await User.findOneAndUpdate(
    { email: user.email },
    { isActive: true }
  );
  return result;
};

const updateToken = async function (id, Token) {
  let result = await User.findOneAndUpdate({ _id: id }, { token: Token });
  return result;
};

const generateToken = async function (email) {
  try {
    const secretkety = process.env.SECRETKEY;
    const token = jwt.sign(email, secretkety);
    return token;
  } catch (err) {
    throw err;
  }
};

const verifyPassword = async function (password, userPassword) {
  const checkPassword = await bcrypt.compare(password, userPassword);
  if (!checkPassword) throw new Error("Invalid credentials");
  return checkPassword;
};

const generateOtp = async function (email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const validUser = await userService.getUserByEmail(email);
  if (!validUser) throw new Error("email does not exist");
  await User.updateOne({ email }, { otp }, { upsert: true });
  const Phone = validUser.phoneNumber;
  const message = await client.messages.create({
    body: ` ${otp}`,
    from: process.env.PHONE_NUMBER,
    to: `+91${Phone}`,
  });
  return message;
};

module.exports = {
  generateToken,
  updateToken,
  generateOtp,
  verifyToken,
  verifyPassword,
  verifyOtp,
  makeUserActive,
  createNewUser,
};
