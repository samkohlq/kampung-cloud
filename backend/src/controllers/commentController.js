import { Comment } from "../db/models";

export const createComment = async (req, res) => {
  const newComment = await Comment.create({
    userUid: req.body.userUid,
    requestId: req.body.requestId,
    comment: req.body.comment,
  }).catch((error) => {
    console.log(error);
  });
  res.send(newComment);
};

export const retrieveComments = async (req, res) => {
  const retrievedComments = await Comment.findAll({
    where: { requestId: req.query.requestId },
    order: [["createdAt", "DESC"]],
  }).catch((error) => {
    console.log(error);
  });
  res.send(retrievedComments);
};
