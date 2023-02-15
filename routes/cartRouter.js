const express = require("express");
const {
  addToCart,
  deleteSingleCartProduct,
} = require("../controllers/cartController");
const auth = require("../middlewares/authMiddleware");

const cartRouter = express.Router({ mergeParams: true });

cartRouter.route("/add-to-cart").post(auth, addToCart);
cartRouter.route("/delete-cart-item").delete(auth, deleteSingleCartProduct);

module.exports = cartRouter;
