const express = require("express");
const { register } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/register").post(register);

module.exports = userRouter;
