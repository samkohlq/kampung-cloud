import express from "express";
import {
  assignPostToFulfiller,
  createPost,
  deletePost,
  removeFulfillerFromPost,
  retrieveAllAssignedPosts,
  retrieveAllPostedPosts,
  retrieveAllPosts,
  retrievePost,
  updatePost,
} from "../controllers/postController";

const router = express.Router();

// create post
router.post("/createPost", (req, res) => createPost(req, res));

// retrieve all posts
router.get("/retrieveAllPosts", (req, res) => retrieveAllPosts(req, res));

// retrieve all posts
router.get("/retrieveAllAssignedPosts", (req, res) =>
  retrieveAllAssignedPosts(req, res)
);

// retrieve all posts
router.get("/retrieveAllPostedPosts", (req, res) =>
  retrieveAllPostedPosts(req, res)
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

// update post
router.put("/updatePost", (req, res) => updatePost(req, res));

export default router;
