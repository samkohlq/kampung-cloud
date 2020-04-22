import express from "express";
import { createUser, retrieveUser } from "../controllers/userController";

const router = express.Router();

// create user
router.post("/createUser", (req, res) => createUser(req, res));
router.get("/retrieveUser", (req, res) => retrieveUser(req, res));

export default router;
