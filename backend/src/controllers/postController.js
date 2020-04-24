import { Post } from "../db/models";

export const createPost = async (req, res) => {
  const newPost = await Promise.all([
    Post.create({
      request: req.body.request,
      requestDetails: req.body.requestDetails,
      requestorUid: req.body.requestorUid,
      requestDeadline: req.body.requestDeadline,
      status: "Need help",
    }),
  ]).catch((error) => {
    console.log(error);
  });
  res.send(newPost);
};

export const retrievePosts = async (req, res) => {
  const posts = await Promise.all([
    Post.findAll({
      order: [
        ["status", "DESC"],
        ["createdAt", "DESC"],
      ],
    }),
  ]).catch((error) => {
    console.log(error);
  });
  res.send(posts);
};
