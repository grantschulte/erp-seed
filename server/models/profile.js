module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      onDelete: "CASCADE",
      as: "user"
    });
  };

  return Profile;
};
