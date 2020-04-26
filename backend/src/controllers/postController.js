import { Post } from "../db/models";

export const createPost = async (req, res) => {
  const newPost = await Promise.all([
    Post.create({
      request: req.body.request,
      requestDetails: req.body.requestDetails,
      requestorUid: req.body.requestorUid,
      requestDeadline: req.body.requestDeadline,
      status: 0,
      verificationStatus: 0,
    }),
  ]).catch((error) => {
    console.log(error);
  });
  res.send(newPost);
};

export const retrieveAllPosts = async (req, res) => {
  const retrievedPosts = await Promise.all([
    Post.findAll({
      order: [
        ["status", "ASC"],
        ["requestDeadline", "ASC"],
      ],
    }),
  ]).catch((error) => {
    console.log(error);
  });
  res.send(retrievedPosts);
};

export const deletePost = async (req, res) => {
  const deletePostSuccess = await Post.destroy({
    where: { id: req.query.postId },
  });
  if (deletePostSuccess) {
    res.send("Post successfully deleted");
  }
};

export const assignPostToFulfiller = async (req, res) => {
  const assignedPost = await Post.update(
    {
      fulfillerUid: req.body.loggedInUserUid,
      status: 1,
    },
    {
      where: { id: req.body.postId },
    }
  );
  res.send(assignedPost);
};

export const retrievePost = async (req, res) => {
  const retrievedPost = await Promise.all([
    Post.findOne({
      where: { id: req.query.postId },
    }),
  ]).catch((error) => {
    console.log(error);
  });
  res.send(retrievedPost);
};
