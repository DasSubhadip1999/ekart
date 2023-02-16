const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Payment = require("../models/paymentModel");

//@route -> /orders/place-order/:paymentID
//@access -> Private
//@method -> POST
const placeOrder = asyncHandler(async (req, res) => {
  const { paymentID } = req.params;

  if (!paymentID) {
    res.status(400);
    throw new Error("Payment id is required");
  }

  const payment = await Payment.findById(paymentID);

  if (payment.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Not authorized");
  }

  const createOrder = await Order.create({
    user: req.user.id,
    paymentID,
  });

  if (!createOrder) {
    res.status(500);
    throw new Error("Something went wrong in placing order");
  }

  res.status(201).json(createOrder);
});

//@route -> /orders/get
//@access -> Private
//@method -> GET
const getOrders = asyncHandler(async (req, res) => {});

module.exports = {
  placeOrder,
  getOrders,
};
