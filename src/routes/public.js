const router = require("express").Router();
const users = require("../controllers/users");

router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

router.get("/login", users.login);
router.post("/login", users.auth);
router.get("/logout", users.logout);

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});
router.post("/register", users.register);

module.exports = router;
