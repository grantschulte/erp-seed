const router = require("express").Router();
const Profile = require("../models").Profile;
const profileController = require("../controllers").profile;
const pageTitle = require("../utils").pageTitle;

router.get("/my-account", (req, res, next) => {
  Profile.findOne({ where: { "userId": req.session.user.id }})
    .then(profile => {
      res.render("profile", {
        title: pageTitle("myAccount"),
        profile
      });
    })
    .catch(err => {
      return next(err);
    });
});

router.post("/my-account", profileController.update);

module.exports = router;
