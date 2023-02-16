const express = require("express");
const { body } = require("express-validator");
const { payment } = require("../controllers/paymentController");
const auth = require("../middlewares/authMiddleware");
const validator = require("../middlewares/validatorMiddleware");

const paymentRouter = express.Router();

paymentRouter
  .route("/payment")
  .post(
    body("paymentMode")
      .exists({ checkFalsy: true })
      .withMessage("paymentMode required")
      .isIn(["online", "cod"])
      .withMessage("Please provide online or cod as paymentMode"),
    validator,
    auth,
    payment
  );

module.exports = paymentRouter;
