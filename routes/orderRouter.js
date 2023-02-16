const express = require("express");
const { placeOrder, getOrders } = require("../controllers/orderController");
const auth = require("../middlewares/authMiddleware");

const orderRouter = express.Router();

orderRouter.route("/place-order/:paymentID").post(auth, placeOrder);
orderRouter.route("/get").get(auth, getOrders);

module.exports = orderRouter;
