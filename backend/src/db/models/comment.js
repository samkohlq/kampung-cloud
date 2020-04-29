"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      userUid: DataTypes.STRING,
      postId: DataTypes.STRING,
      comment: DataTypes.STRING,
    },
    {}
  );
  return Comment;
};
