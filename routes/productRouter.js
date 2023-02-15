const express = require("express");
const { body } = require("express-validator");
const { addProduct } = require("../controllers/productController");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const productRouter = express.Router();

productRouter
  .route("/add-product")
  .post(
    body("name")
      .exists({ checkFalsy: true })
      .withMessage("Please enter product name"),
    body("price")
      .exists({ checkFalsy: true })
      .withMessage("Please enter product price"),
    auth,
    upload.array("images"),
    addProduct
  );

module.exports = productRouter;
