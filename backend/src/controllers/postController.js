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
        ["requestDeadline", "ASC"],
      ],
    }),
  ]).catch((error) => {
    console.log(error);
  });
  res.send(posts);
};

export const deletePost = async (req, res) => {
  const deletePostSuccess = await Post.destroy({
    where: { id: req.query.postId },
  });
  if (deletePostSuccess) {
    res.send("Post successfully deleted");
  }
};
