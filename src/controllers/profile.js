const Profile = require("../models").Profile;
const User = require("../models").User;

function update(req, res, next) {
  const { firstName, lastName } = req.body.profile;
  const userId = req.session.user.id;

  console.log("USER ID", userId);

  Profile.findOrCreate({ where: { "userId": userId }})
    .spread((profile, created) => {

      // console.log("FIND OR UPDATE PROFILE", profile);
      console.log("PROFILE ID", profile.id);

      Profile.update({
        firstName: firstName,
        lastName: lastName
      }, {
        where: {
          id: profile.id
        }
      }).then(profile => {
        console.log("UPDATE PROFILE", profile);
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
