import { Post } from "../db/models";

export const createPost = async (req, res) => {
  const newPost = await Promise.all([
    Post.create({
      request: req.body.request,
      requestDetails: req.body.requestDetails,
      requestorUid: req.body.requestorUid,
      requestDeadline: req.body.requestDeadline,
    }),
  ]).catch((error) => {
    console.log(error);
  });
  res.send(newPost);
};
