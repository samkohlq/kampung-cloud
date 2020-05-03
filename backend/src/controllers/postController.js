import { Post } from "../db/models";

export const createPost = async (req, res) => {
  const newPost = await Post.create({
    requestDeadline: req.body.requestDeadline,
    requestType: req.body.requestType,
    request: req.body.request,
    requestDetails: req.body.requestDetails,
    requestorUid: req.body.requestorUid,
    requestStatus: 0,
    verificationStatus: 0,
  }).catch((error) => {
    console.log(error);
  });
  res.send(newPost);
};

export const retrievePosts = async (req, res) => {
  let retrievedPosts;
  if (req.query.postsListType == "all") {
    retrievedPosts = await Post.findAll({
      order: [
        ["requestStatus", "ASC"],
        ["requestDeadline", "ASC"],
      ],
    }).catch((error) => {
      console.log(error);
    });
  } else {
    retrievedPosts = await Post.findAll({
      where: { requestType: req.query.postsListType },
      order: [
        ["requestStatus", "ASC"],
        ["requestDeadline", "ASC"],
      ],
    }).catch((error) => {
      console.log(error);
    });
  }
  res.send(retrievedPosts);
};

export const retrieveAllAssignedPosts = async (req, res) => {
  const retrievedAssignedPosts = await Promise.all([
    Post.findAll({
      where: { fulfillerUid: req.query.loggedInUserUid },
      order: [
        ["requestStatus", "ASC"],
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
        ["requestStatus", "ASC"],
        ["requestDeadline", "ASC"],
      ],
    }),
  ]).catch((error) => {
    console.log(error);
  });
  res.send(retrievedPostedPosts);
};

export const countPostsByRequestStatus = async (req, res) => {
  const numOfCompletedPosts = await Post.count({
    where: { requestStatus: 2 },
  }).catch((error) => {
    console.log(error);
  });
  const numOfInProgressPosts = await Post.count({
    where: { requestStatus: 1 },
  }).catch((error) => {
    console.log(error);
  });
  const numOfOutstandingPosts = await Post.count({
    where: { requestStatus: 0 },
  }).catch((error) => {
    console.log(error);
  });
  res.send({
    completedPosts: numOfCompletedPosts,
    inProgressPosts: numOfInProgressPosts,
    outstandingPosts: numOfOutstandingPosts,
  });
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
      requestStatus: 1,
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
      requestStatus: 0,
    },
    {
      where: { id: req.query.postId },
    }
  );
  res.send(updatedPost);
};

export const markPostAsCompleted = async (req, res) => {
  const updatedPost = await Post.update(
    {
      requestStatus: 2,
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
      requestDeadline: req.body.requestDeadline,
      requestType: req.body.requestType,
      request: req.body.request,
      requestDetails: req.body.requestDetails,
    },
    {
      where: { id: req.query.postId },
    }
  );
  res.send(updatedPost);
};
