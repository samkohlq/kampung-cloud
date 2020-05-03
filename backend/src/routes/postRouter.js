import express from "express";
import {
  assignPostToFulfiller,
  countPostsByRequestStatus,
  createPost,
  deletePost,
  markPostAsCompleted,
  removeFulfillerFromPost,
  retrieveAllAssignedPosts,
  retrieveAllPostedPosts,
  retrievePost,
  retrievePosts,
  updatePost,
} from "../controllers/postController";
import { postValidationRules, validate } from "../validations/postValidator";

const router = express.Router();

// create post
router.post("/createPost", postValidationRules(), validate, (req, res) =>
  createPost(req, res)
);

// retrieve all posts
router.get("/retrievePosts", (req, res) => retrievePosts(req, res));

// retrieve all posts
router.get("/retrieveAllAssignedPosts", (req, res) =>
  retrieveAllAssignedPosts(req, res)
);

// retrieve all posts
router.get("/retrieveAllPostedPosts", (req, res) =>
  retrieveAllPostedPosts(req, res)
);

// retrieve count of all completed posts
router.get("/countPostsByRequestStatus", (req, res) =>
  countPostsByRequestStatus(req, res)
);

// retrieve a post
router.get("/retrievePost", (req, res) => retrievePost(req, res));

// delete post
router.post("/deletePost", (req, res) => deletePost(req, res));

// assign post
router.put("/assignPostToFulfiller", (req, res) =>
  assignPostToFulfiller(req, res)
);

// remove fulfiller from post
router.put("/removeFulfillerFromPost", (req, res) =>
  removeFulfillerFromPost(req, res)
);

// remove fulfiller from post
router.put("/markPostAsCompleted", (req, res) => markPostAsCompleted(req, res));

// update post
router.put("/updatePost", postValidationRules(), validate, (req, res) =>
  updatePost(req, res)
);

export default router;
