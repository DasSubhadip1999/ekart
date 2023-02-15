const asynchandler = require("express-async-handler");

const addProduct = asynchandler(async (req, res) => {
  const { name, price } = req.body;
});
