const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    maxlength: 200,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Solver"],
  },
  token: {
    type: String,
  },
  otp: {
    type: String,
    expires: "5m",
  },
  phoneNumber: {
    type: Number,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
