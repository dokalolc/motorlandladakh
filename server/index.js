const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const reviewRoutes = require("./routes/reviewRoutes");
app.use("/reviews", reviewRoutes);


app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req,res)=>{
  res.send("MotorLand API Running");
});

app.listen(4000, ()=>{
  console.log("Server running on port 4000");
});
