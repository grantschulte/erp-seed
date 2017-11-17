const router = require("express").Router();
const usersController = require("../controllers").users;
const pageTitle = require("../utils").pageTitle;

router.get("/", (req, res) => {
  res.render("home", { title: pageTitle("home") });
});
router.get("/login", (req, res) => {
  res.render("login", {
    title: pageTitle("login")
  });
});
router.post("/login", usersController.login);
router.get("/logout", usersController.logout);
router.get("/signup", (req, res) => {
  res.render("signup", {
    title: pageTitle("signup")
  });
});
router.post("/signup", usersController.signup);

module.exports = router;
