const express = require("express");
const { body } = require("express-validator");
const { register, login } = require("../controllers/userController");
const validator = require("../middlewares/validatorMiddleware");

const userRouter = express.Router();

userRouter
  .route("/register")
  .post(
    body("name").exists({ checkFalsy: true }).withMessage("Please enter name"),
    body("email").isEmail().withMessage("Please enter a valid email id"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should have minimum length of six"),
    validator,
    register
  );

userRouter
  .route("/login")
  .post(
    body("email").isEmail().withMessage("Please enter an email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should have minimum length of six"),
    validator,
    login
  );

module.exports = userRouter;
