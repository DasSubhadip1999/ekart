require("dotenv").config();
require("colors");
const express = require("express");
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", require("./routes/userRouter"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Ekart" });
});

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`.yellow.underline)
);
