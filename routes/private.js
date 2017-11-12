const router = require("express").Router();

router.get("/profile", (req, res) => {
  res.render("profile", { title: "Profile" });
});

module.exports = router;
