const express = require("express");
const { body } = require("express-validator");
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/productController");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const validator = require("../middlewares/validatorMiddleware");

const productRouter = express.Router();

productRouter
  .route("/add-product")
  .post(auth, upload.array("images"), addProduct);

productRouter.route("/get").get(getAllProducts);
productRouter.route("/get/:productID").get(getSingleProduct);

module.exports = productRouter;
