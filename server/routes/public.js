const router = require("express").Router();
const usersController = require("../controllers").users;
const pageTitle = require("../utils").pageTitle;

router.get("/", (req, res) => {
  res.render("home", {
    title: pageTitle("home")
  });
});

router.get("/login", usersController.show);
router.post("/login", usersController.login);
router.get("/logout", usersController.logout);

router.get("/signup", usersController.signup);
router.post("/signup", usersController.create);

module.exports = router;
