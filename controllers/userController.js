const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("This email id is already registered");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (!user) {
    res.status(500);
    throw new Error("Something went wrong while registering");
  }

  res.status(201).json({
    name: user.name,
    email: user.email,
    token: genToken(user._id),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.find({ email });

  if (!user) {
    throw new Error("No user found");
  }

  if (await bcrypt.compare(password, user.password)) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      token: genToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect credentials");
  }
});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

module.exports = {
  register,
};
