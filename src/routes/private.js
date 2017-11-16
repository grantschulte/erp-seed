const router = require("express").Router();
const Profile = require("../models").Profile;
const profileController = require("../controllers").profile;

router.get("/profile", (req, res, next) => {
  Profile.findOne({ where: { "userId": req.session.user.id }})
    .then(profile => {
      console.log("FOUND PROFILE", profile);

      res.render("profile", {
        title: "Profile",
        profile
      });
    })
    .catch(err => {
      return next(err);
    });
});

router.post("/profile", profileController.update);

module.exports = router;
