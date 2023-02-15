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
    cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: { products: { product: product._id } },
      }
    );
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

//@route -> /products/get/cart-products
//@access ->  private
//@methode -> GET
const getCartProducts = asyncHandler(async (req, res) => {
  const carts = await Cart.find({ user: req.user.id });

  if (!carts) {
    res.status(500);
    throw new Error("Something went wrong while getting the carts");
  }

  if (carts.length === 0) {
    res.status(200).json({ message: "No cart available" });
  }

  res.status(200).json(carts);
});

//@route -> /products/get/:productID/delete-cart-item
//@access ->  private
//@methode -> DELETE
const deleteSingleCartProduct = asyncHandler(async (req, res) => {
  const { productID } = req.params;

  const product = await Product.findById(productID);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const carts = await Cart.find({ user: req.user.id });

  if (carts.length === 0) {
    res.status(200).json("No cart items available");
  }

  const deleteCartItem = await Cart.findOneAndUpdate(
    { user: req.user.id },
    { $pull: { products: { product: product._id } } }
  );

  if (!deleteCartItem) {
    res.status(500);
    throw new Error("Something went wrong while deleting cart item");
  }

  res.status(200).json({ message: "Cart item deleted successfully" });
});

module.exports = {
  addToCart,
  getCartProducts,
  deleteSingleCartProduct,
};