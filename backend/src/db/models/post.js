"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      request: DataTypes.STRING,
      requestorUid: DataTypes.STRING,
      fulfillerUid: DataTypes.STRING,
      status: DataTypes.STRING,
      requestDeadline: DataTypes.DATE,
      requestDetails: DataTypes.STRING,
    },
    {}
  );
  return Post;
};
