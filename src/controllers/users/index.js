const testUser = {
  username: "grant",
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
  res.json(req.body.user);
}

module.exports = {
  login,
  logout,
  auth,
  register
}
