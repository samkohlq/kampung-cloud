import express from "express";
import { createUser } from "../controllers/userController";

const router = express.Router();

// create user
router.post("/createUser", (req, res) => createUser(req, res));

export default router;
