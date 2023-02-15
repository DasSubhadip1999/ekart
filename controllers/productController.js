const asynchandler = require("express-async-handler");
const User = require("../models/userModel");
const Product = require("../models/productModel");

const addProduct = asynchandler(async (req, res) => {
  const productUploader = await User.findById(req.user.id);

  const { name, price } = req.body;

  let images;
  if (req.files) {
    images = req.files.map((image) => `${process.env.BASE_URL}/${image.path}`);
  }

  const product = await Product.create({
    sellerID: productUploader._id,
    name,
    images,
    price,
  });

  if (!product) {
    res.status(500);
    throw new Error("Something went wrong in adding products");
  }

  res.status(201).json(product);
});

module.exports = {
  addProduct,
};
