// Set your default environment here. This value will
// be overwritten by env settings passed to webpack
// via npm scripts.

const defaultEnvironment = "development";

module.exports = (env = defaultEnvironment) => {
  const config = {
    development: {
      "API_URL": JSON.stringify("http://localhost:3000"),
      "NODE_ENV": JSON.stringify("development")
    },
    staging: {
      "API_URL": JSON.stringify("https://api-staging.example.com"),
      "NODE_ENV": JSON.stringify("staging")
    },
    production: {
      "API_URL": JSON.stringify("https://api-production.example.com"),
      "NODE_ENV": JSON.stringify("production")
    }
  };

  return config[env];
};
