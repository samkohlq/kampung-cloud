import express from "express";
import {
  createUser,
  deleteUser,
  removeUserVerificationStatus,
  retrieveUserInfo,
  updateUserPhoneNum,
  verifyUser,
} from "../controllers/userController";
import { phoneNumValidationRules, validate } from "./validator";

const router = express.Router();

// create user
router.post("/createUser", (req, res) => createUser(req, res));

// check if user is verified
router.get("/retrieveUserInfo", (req, res) => retrieveUserInfo(req, res));

// delete user
router.post("/deleteUser", (req, res) => deleteUser(req, res));

// verify user
router.put("/verifyUser", (req, res) => verifyUser(req, res));

// remove user's verification status
router.put("/removeUserVerificationStatus", (req, res) =>
  removeUserVerificationStatus(req, res)
);

// update user's phone number
router.put(
  "/updateUserPhoneNum",
  phoneNumValidationRules(),
  validate,
  (req, res) => updateUserPhoneNum(req, res)
);

export default router;
