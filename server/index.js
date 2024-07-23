const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const app = express();

app.use(cors());
const port = 8000;
connectToMongo();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`listening on port ${port}, with cors enabled.`);
});
