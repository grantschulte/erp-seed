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
      beforeCreate: function(user) {
        return User.generateHash(user.password, (err, hash) => {
          if (err) {
            throw new Error("Generate hash error.");
          }
          user.password = hash;
        });
      },
      beforeUpdate: function(user) {
        return User.generateHash(user.password, (err, hash) => {
          if (err) {
            throw new Error("Generate hash error.");
          }
          user.password = hash;
        });
      }
    }
  });

  User.generateHash = function(password, cb) {
    return bcrypt.hash(password, 10)
      .then(hash => {
        cb(null, hash);
      }).catch(err => {
        cb(err);
      });
  };

  User.comparePassword = function(password, hash, cb) {
    return bcrypt.compare(password, hash)
      .then(same => {
        if (!same) {
          return cb(new Error("Invalid credentials"));
        }
        cb();
      }).catch(err => {
        cb(err);
      });
  };

  User.clean = function(user) {
    return {
      email: user.email,
      id: user.id
    };
  };

  return User;
};
