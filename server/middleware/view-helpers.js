const routeConfig = require("../config/routes");

module.exports = (config) => {
  return (req, res, next) => {
    if (config.links) {
      res.locals.links = links;
    }

    next();
  };
};

function links(page) {
  return routeConfig.hasOwnProperty(page)
    ? routeConfig[page].path
    : routeConfig.home.path;
}
