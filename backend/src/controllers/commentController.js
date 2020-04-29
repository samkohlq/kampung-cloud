import { Comment } from "../db/models";

export const createComment = async (req, res) => {
  const newComment = await Comment.create({
    userUid: req.body.userUid,
    postId: req.body.postId,
    comment: req.body.comment,
  }).catch((error) => {
    console.log(error);
  });
  res.send(newComment);
};

export const retrievePostComments = async (req, res) => {
  const retrievedComments = await Comment.findAll({
    where: { postId: req.query.postId },
    order: [["createdAt", "DESC"]],
  }).catch((error) => {
    console.log(error);
  });
  res.send(retrievedComments);
};
