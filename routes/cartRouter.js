const express = require("express");
const addToCart = require("../controllers/cartController");
const auth = require("../middlewares/authMiddleware");

const cartRouter = express.Router({ mergeParams: true });

cartRouter.route("/add-to-cart").post(auth, addToCart);

module.exports = cartRouter;
