const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const PaymentModel = require("../models/paymentModel");

//@route -> /checkout/payement
//@access ->  private
//@methode -> POST
const payment = asyncHandler(async (req, res) => {
  const { paymentMode } = req.body;

  let paymentStatus;

  if (paymentMode === "cod") {
    paymentStatus = "pending";
  } else if (paymentMode === "online") {
    paymentStatus = "fullfilled";
  }

  const cart = await Cart.findOne({ user: req.user.id }).populate({
    path: "products",
    populate: "product",
  });

  if (!cart) {
    res.status(400);
    throw new Error("Cart not found");
  }

  if (cart.products.length === 0) {
    res.status(200).json({ message: "Cart is empty" });
  }

  const updateCart = await Cart.findByIdAndUpdate(cart._id, {
    $set: {
      "products.$[].expectedDeliveryDate": new Date(
        new Date().setDate(new Date().getDate() + 7)
      ),
    },
  });

  const newCart = await Cart.findById(updateCart._id).populate({
    path: "products",
    populate: "product",
  });

  const isPayment = await PaymentModel.create({
    user: req.user.id,
    products: newCart.products,
    paymentAmount: newCart.cartValue,
    paymentMode,
    paymentStatus,
  });

  if (!isPayment) {
    res.status(500);
    throw new Error("Something went wrong in making payment");
  }

  res.status(201).json(isPayment);
});

module.exports = {
  payment,
};
