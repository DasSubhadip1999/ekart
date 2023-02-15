const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = asyncHandler(async (req, res, next) => {
  let token;
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer")) {
    try {
      token = header.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decode.id).select("-password");

      if (req.url === "/add-product") {
        if (!req.user.isAdmin) {
          res.status(401);
          throw new Error("Only admins can add product");
        }
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  } else {
    if (!token) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
});

module.exports = auth;
