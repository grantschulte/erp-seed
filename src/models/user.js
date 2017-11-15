const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20]
      }
    },
  }, {
    hooks: {
      beforeCreate: function(user, options) {
        return User.generateHash(user.password)
          .then(hash => {
            user.password = hash;
          }).catch(err => {
            throw new Error("Generate hash error.");
          });
      },
      beforeUpdate: function(user, done) {

      }
    }
  });

  User.generateHash = function(password) {
    return bcrypt.hash(password, 10);
  }

  User.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
  }

  return User;
};
