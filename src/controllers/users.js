const User = require("../models").User;

const testUser = {
  email: "grant",
  password: "password"
};

function login(req, res) {
  res.render("login", { title: "Login" });
};

function logout(req, res, next) {
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
};

function auth(req, res, next) {
  let { username, password } = req.body.user;

  if (username === testUser.username
    && password === testUser.password) {
      req.session.user = username;
      res.locals.user = username;
      res.redirect("/profile");
  } else {
    res.redirect("back");
  }
}

function register(req, res, next) {
  let { email, password } = req.body.user;

  User.create(req.body.user)
  .then(user => {
    console.log("USER CREATED");
    req.session.user = user.email;
    res.json(user);
    // res.redirect("/profile");
  }).catch(err => {
    res.json({ err: err.message });
    console.log("USER CREATE ERROR", err);
  });
}

module.exports = {
  login,
  logout,
  auth,
  register
}
