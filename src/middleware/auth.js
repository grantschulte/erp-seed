module.exports = () => {
  return (req, res, next) => {
    if (!req.session.user) {
      // User is not authorized. Redirect back.
      res.redirect("back");
    } else {
      // User is authorized and so may continue.
      next();
    }
  };
};
