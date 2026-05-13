const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const reviewRoutes = require("./routes/reviewRoutes");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("MotorLand API Running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});