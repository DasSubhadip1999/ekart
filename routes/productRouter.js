const express = require("express");
const { body } = require("express-validator");
const { getCartProducts } = require("../controllers/cartController");
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/productController");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const validator = require("../middlewares/validatorMiddleware");

const productRouter = express.Router();

//re routing cart route
productRouter.use("/get/:productID", require("./cartRouter"));

productRouter
  .route("/add-product")
  .post(auth, upload.array("images"), addProduct);

productRouter.route("/get").get(getAllProducts);
productRouter.route("/get/:productID").get(getSingleProduct);
productRouter.route("/cart-products").get(auth, getCartProducts);

module.exports = productRouter;
