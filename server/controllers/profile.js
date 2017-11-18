const Profile = require("../models").Profile;
const pageTitle = require("../utils").pageTitle;

function show(req, res, next) {
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
}

function update(req, res, next) {
  const { firstName, lastName } = req.body.profile;
  const userId = req.session.user.id;

  Profile.findOrCreate({ where: { "userId": userId }})
    .spread(profile => {
      Profile.update({
        firstName: firstName,
        lastName: lastName
      }, {
        where: {
          id: profile.id
        }
      }).then(() => {
        res.redirect("back");
      });
    })
    .catch(err => {
      return next(err);
    });
}

module.exports = {
  update,
  show
};
