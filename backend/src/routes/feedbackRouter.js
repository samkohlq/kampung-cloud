import express from "express";
import { createFeedback } from "../controllers/FeedbackController";

const router = express.Router();

// create Feedback
router.post("/createFeedback", (req, res) => createFeedback(req, res));

export default router;
