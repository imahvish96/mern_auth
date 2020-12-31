const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/Routes");
const path = require("path");
const dotenv = require("dotenv");
const User = require("./model/User");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: "thequickbrowfox",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

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
