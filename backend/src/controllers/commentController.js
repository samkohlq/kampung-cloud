import { Comment } from "../db/models";

export const createComment = async (req, res) => {
  const newComment = await Comment.create({
    commentorUid: req.body.userUid,
    postId: req.body.postId,
    comment: req.body.comment,
  }).catch((error) => {
    console.log(error);
  });
  res.send(newComment);
};
