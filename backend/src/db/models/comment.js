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
  Comment.associate = function (models) {
    Comment.belongsTo(models.Post);
    Comment.belongsTo(models.User);
  };
  return Comment;
};
