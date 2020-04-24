"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNum: DataTypes.STRING,
      authUid: DataTypes.STRING,
    },
    {}
  );
  return User;
};
