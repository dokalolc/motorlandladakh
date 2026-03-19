const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const https = require("https");
const fs = require("fs");
const app = require("./app");

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

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
};

https.createServer(options, app).listen(3000, () => {
  console.log("Server running on https://localhost:3000");
});