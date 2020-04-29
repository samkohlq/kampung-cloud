"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNum: DataTypes.STRING,
      authUid: DataTypes.STRING,
      verificationStatus: DataTypes.INTEGER,
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Comment);
  };
  return User;
};
