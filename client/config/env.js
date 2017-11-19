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
    production: {
      "API_URL": JSON.stringify("https://api-production.example.com"),
      "NODE_ENV": JSON.stringify("production")
    },
    test: {
      "API_URL": JSON.stringify("https://api-test.example.com"),
      "NODE_ENV": JSON.stringify("test")
    },
  };

  return config[env];
};
