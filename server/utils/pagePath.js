const routeConfig = require("../config/routes");

module.exports = (page) => {
  return routeConfig.hasOwnProperty(page)
    ? routeConfig[page].path
    : routeConfig.home.path;
};
