const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

//@route -> /products/get/:productID/add-to-cart
//@access ->  private
//@methode -> POST
const addToCart = asyncHandler(async (req, res) => {
  const { productID } = req.params;

  const product = await Product.findById(productID);

  if (!product) {
    res.status(500);
    throw new Error("Something went wrong in getting product");
  }

  //users cart
  const cartExists = await Cart.find({ user: req.user.id });

  let cart;

  if (cartExists.length > 0) {
    cart = await Cart.findByIdAndUpdate(cartExists[0]._id, {
      $push: { products: { product: product._id } },
    });
  } else {
    cart = await Cart.create({
      user: req.user.id,
      products: [{ product: product._id }],
    });
  }

  if (!cart) {
    res.status(500);
    throw new Error("Something went wrong while adding to cart");
  }

  res.status(201).json(cart);
});

module.exports = addToCart;
