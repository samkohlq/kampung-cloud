import express from "express";
import {
  assignPost,
  createPost,
  deletePost,
  retrieveAllPosts,
  retrievePost,
} from "../controllers/postController";

const router = express.Router();

// create post
router.post("/createPost", (req, res) => createPost(req, res));

// retrieve all posts
router.get("/retrieveAllPosts", (req, res) => retrieveAllPosts(req, res));

// delete post
router.post("/deletePost", (req, res) => deletePost(req, res));

// assign post
router.put("/assignPost", (req, res) => assignPost(req, res));

// retrieve a post
router.get("/retrievePost", (req, res) => retrievePost(req, res));

export default router;
