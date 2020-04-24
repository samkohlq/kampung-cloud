import express from "express";
import {
  createPost,
  deletePost,
  retrievePosts,
} from "../controllers/postController";

const router = express.Router();

// create post
router.post("/createPost", (req, res) => createPost(req, res));

// retrieve posts
router.get("/retrievePosts", (req, res) => retrievePosts(req, res));

// delete post
router.post("/deletePost", (req, res) => deletePost(req, res));

export default router;
