const asynchandler = require("express-async-handler");
const User = require("../models/userModel");
const Product = require("../models/productModel");

const addProduct = asynchandler(async (req, res) => {
  const productUploader = await User.findById(req.user.id);

  const { name, price } = req.body;

  if (!name || !price || !req.files) {
    res.status(400);
    throw new Error("Please enter name, email and images");
  }

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

const getAllProducts = asynchandler(async (req, res) => {
  const products = await Product.find()
    .populate("sellerID")
    .select("-password");

  if (!products) {
    res.status(500);
    throw new Error("couldn't get products");
  }

  res.status(200).json(products);
});

const getSingleProduct = asynchandler(async (req, res) => {
  const { productID } = req.params;

  const product = await Product.findOne({ _id: productID }).populate(
    "sellerID"
  );

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
};
