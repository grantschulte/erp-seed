const User = require("../models").User;
const pagePath = require("../utils").pagePath;
const pageTitle = require("../utils").pageTitle;

/*
 * show
 */

function show(req, res) {
  res.render("login", {
    title: pageTitle("login")
  });
}

/*
 * signup
 */

function signup(req, res) {
  res.render("signup", {
    title: pageTitle("signup")
  });
}

/*
 * login
 */

function login(req, res, next) {
  let { email, password } = req.body.user;

  User.findOne({ where: { email }})
    .then(user => {
      User.comparePassword(password, user.password, err => {
        if (!err) {
          req.session.user = User.clean(user);
          res.redirect(pagePath("myAccount"));
        } else {
          res.redirect("back");
        }
      });
    })
    .catch(err => {
      return next(err);
    });
}

/*
 * logout
 */

function logout(req, res, next) {
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }
    res.redirect(pagePath("home"));
  });
}

/*
 * create
 */

function create(req, res, next) {
  User.create(req.body.user)
    .then(user => {
      req.session.user = User.clean(user);
      res.redirect(pagePath("myAccount"));
    }).catch(err => {
      return next(err);
    });
}

module.exports = {
  create,
  login,
  logout,
  show,
  signup
};
