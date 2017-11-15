const router = require("express").Router();
const usersController = require("../controllers").users;

router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

router.get("/login", usersController.login);
router.post("/login", usersController.auth);

router.get("/logout", usersController.logout);

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});
router.post("/register", usersController.register);

module.exports = router;
