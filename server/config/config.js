const Sequelize = require("sequelize");

module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "erp-seed-dev",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": Sequelize.Op
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "erp-seed-test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": Sequelize.Op
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "erp-seed-prod",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": Sequelize.Op
  }
}
