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

export const retrieveAllAssignedPosts = async (req, res) => {
  const retrievedAssignedPosts = await Promise.all([
    Post.findAll({
      where: { fulfillerUid: req.query.loggedInUserUid },
      order: [
        ["status", "ASC"],
        ["requestDeadline", "ASC"],
      ],
    }),
  ]).catch((error) => {
    console.log(error);
  });
  res.send(retrievedAssignedPosts);
};

export const retrieveAllPostedPosts = async (req, res) => {
  const retrievedPostedPosts = await Promise.all([
    Post.findAll({
      where: { requestorUid: req.query.loggedInUserUid },
      order: [
        ["status", "ASC"],
        ["requestDeadline", "ASC"],
      ],
    }),
  ]).catch((error) => {
    console.log(error);
  });
  res.send(retrievedPostedPosts);
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
      where: { id: req.query.postId },
    }
  );
  res.send(assignedPost);
};

export const removeFulfillerFromPost = async (req, res) => {
  const updatedPost = await Post.update(
    {
      fulfillerUid: null,
      status: 0,
    },
    {
      where: { id: req.query.postId },
    }
  );
  res.send(updatedPost);
};

export const updatePost = async (req, res) => {
  const updatedPost = await Post.update(
    {
      request: req.body.request,
      requestDeadline: req.body.requestDeadline,
      requestDetails: req.body.requestDetails,
    },
    {
      where: { id: req.query.postId },
    }
  );
  res.send(updatedPost);
};
