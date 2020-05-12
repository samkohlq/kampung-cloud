import express from "express";
import { createFeedback } from "../controllers/feedbackController";
import {
  feedbackValidationRules,
  validate,
} from "../validations/feedbackValidator";

const router = express.Router();

// create Feedback
router.post(
  "/createFeedback",
  feedbackValidationRules(),
  validate,
  (req, res) => createFeedback(req, res)
);

export default router;
