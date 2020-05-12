import express from "express";
import { createFeedback } from "../controllers/feedbackController";

const router = express.Router();

// create Feedback
router.post("/createFeedback", (req, res) => createFeedback(req, res));

export default router;
