import express from "express";
import { createPost } from "../controllers/postController";

const router = express.Router();

// create post
router.post("/createPost", (req, res) => createPost(req, res));

export default router;
