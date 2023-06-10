const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.mongoURI;
mongoose.set("strictQuery", false);
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to database");
  });
};

module.exports = connectToMongo;
