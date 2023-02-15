const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  paymentAmount: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ["online", "cod"],
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "fullfilled"],
  },
});
