"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      userUid: DataTypes.STRING,
      requestId: DataTypes.STRING,
      comment: DataTypes.STRING,
    },
    {}
  );
  return Comment;
};
