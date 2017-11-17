const Profile = require("../models").Profile;
const User = require("../models").User;

function update(req, res, next) {
  const { firstName, lastName } = req.body.profile;
  const userId = req.session.user.id;

  Profile.findOrCreate({ where: { "userId": userId }})
    .spread((profile, created) => {
      Profile.update({
        firstName: firstName,
        lastName: lastName
      }, {
        where: {
          id: profile.id
        }
      }).then(profile => {
        res.redirect("back");
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  update
};
