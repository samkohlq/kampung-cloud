import express from "express";
import {
  checkIfUserVerified,
  createUser,
  deleteUser,
  removeUserVerificationStatus,
  verifyUser,
} from "../controllers/userController";

const router = express.Router();

// create user
router.post("/createUser", (req, res) => createUser(req, res));

// check if user is verified
router.get("/checkIfUserVerified", (req, res) => checkIfUserVerified(req, res));

// delete user
router.post("/deleteUser", (req, res) => deleteUser(req, res));

// verify user
router.put("/verifyUser", (req, res) => verifyUser(req, res));

// remove user's verification status
router.put("/removeUserVerificationStatus", (req, res) =>
  removeUserVerificationStatus(req, res)
);

export default router;
