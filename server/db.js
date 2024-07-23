const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
const mongo_uri = process.env.MONGO_URL;
const connectToMongo = async () => {
  mongoose
    .connect(mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to Mongo.");
    })
    .catch((err) => {
      console.log("Could not connect", err);
    });
};
module.exports = connectToMongo;
