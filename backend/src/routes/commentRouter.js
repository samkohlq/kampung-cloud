import express from "express";
import { createComment } from "../controllers/commentController";

const router = express.Router();

// create post
router.post("/createComment", (req, res) => createComment(req, res));
