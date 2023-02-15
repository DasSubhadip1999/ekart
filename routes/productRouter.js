const express = require("express");
const { addProduct } = require("../controllers/productController");

const productRouter = express.Router();

productRouter.route("/add-product").post(addProduct);

module.exports = productRouter;
