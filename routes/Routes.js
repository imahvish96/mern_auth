const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

//POST ROUTES
router.post("/login", (req, res) => {
  res.render("login");
});

router.post("/signup", (req, res) => {
  let { email, password } = req.body;
  let userData = { email, password };
  console.log(userData);
  res.render("signup");
});

module.exports = router;
