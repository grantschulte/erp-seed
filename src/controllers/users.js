const User = require("../models").User;

/**
 * login
 */

function login(req, res) {
  res.render("login", { title: "Login" });
};

/**
 * logout
 */

function logout(req, res, next) {
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
};

/**
 * auth
 */

function auth(req, res, next) {
  let { email, password } = req.body.user;

  User.findOne({ where: { email: email }})
    .then(user => {
      User.comparePassword(password, user.password, err => {
        if (!err) {
          req.session.user = User.clean(user);
          res.redirect("/profile");
        } else {
          res.redirect("back");
        }
      });
    })
    .catch(err => {
      return next(err);
    });
}

/**
 * register
 */

function register(req, res, next) {
  let { email, password } = req.body.user;

  User.create(req.body.user)
    .then(user => {
      req.session.user = User.clean(user);
      res.redirect("/profile");
    }).catch(err => {
      return next(err);
    });
}

module.exports = {
  login,
  logout,
  auth,
  register
}
