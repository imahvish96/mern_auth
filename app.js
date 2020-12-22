const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/Routes");
const path = require("path");
const dotenv = require("dotenv");
const User = require("./model/User")

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config({ path: "./config.env" });

mongoose.connect(
  process.env.DATABASE_LOCAL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Data Base Connected");
  }
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);

app.listen(process.env.PORT, (req, res) => {
  console.log("Running Port");
});
