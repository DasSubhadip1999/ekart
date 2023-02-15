const express = require("express");
const { body } = require("express-validator");
const { addProduct } = require("../controllers/productController");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const validator = require("../middlewares/validatorMiddleware");

const productRouter = express.Router();

productRouter
  .route("/add-product")
  .post(auth, upload.array("images"), addProduct);

module.exports = productRouter;
