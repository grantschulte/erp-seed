module.exports = () => {
  return (req, res, next) => {
    if (!req.session.user) {
      console.log("Not authorized.");
      res.redirect("back");
    } else {
      next();
    }
  }
}
