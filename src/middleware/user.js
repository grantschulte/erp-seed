module.exports = () => {
  return (req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user;
      console.log("RES.US", res.locals.user);
    }

    next();
  };
};
