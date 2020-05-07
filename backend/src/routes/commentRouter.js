import express from "express";
import {
  createComment,
  retrieveComments,
} from "../controllers/commentController";

const router = express.Router();

// create comment
router.post("/createComment", (req, res) => createComment(req, res));

// retrieve comments belonging to a request
router.get("/retrieveComments", (req, res) => retrieveComments(req, res));

export default router;
