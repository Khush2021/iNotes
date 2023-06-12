const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
const connectToMongo = () => {
  mongoose.connect(
    `${process.env.MONGO_URL}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("connected to mongoDB database.");
    }
  );
};

module.exports = connectToMongo;
