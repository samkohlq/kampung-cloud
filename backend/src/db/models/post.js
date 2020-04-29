"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      request: DataTypes.STRING,
      requestType: DataTypes.STRING,
      requestorUid: DataTypes.STRING,
      fulfillerUid: DataTypes.STRING,
      requestStatus: DataTypes.INTEGER,
      requestDeadline: DataTypes.DATE,
      requestDetails: DataTypes.STRING,
    },
    {}
  );
  return Post;
};
