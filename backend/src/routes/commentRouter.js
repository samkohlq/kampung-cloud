import express from "express";
import {
  createComment,
  retrievePostComments,
} from "../controllers/commentController";

const router = express.Router();

// create post
router.post("/createComment", (req, res) => createComment(req, res));

// retrieve comments belonging to a post
router.get("/retrievePostComments", (req, res) =>
  retrievePostComments(req, res)
);

export default router;
