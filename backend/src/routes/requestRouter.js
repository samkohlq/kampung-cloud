import express from "express";
import {
  assignRequestToFulfiller,
  countRequestsByStatus,
  createRequest,
  deleteRequest,
  markRequestCompleted,
  removeFulfillerFromRequest,
  retrieveAssignedRequests,
  retrievePostedRequests,
  retrieveRequest,
  retrieveRequests,
  updateRequest,
} from "../controllers/requestController";
import {
  requestValidationRules,
  validate,
} from "../validations/requestValidator";

const router = express.Router();

// create request
router.post("/createRequest", requestValidationRules(), validate, (req, res) =>
  createRequest(req, res)
);

// retrieve all requests
router.get("/retrieveRequests", (req, res) => retrieveRequests(req, res));

// retrieve assigned requests
router.get("/retrieveAssignedRequests", (req, res) =>
  retrieveAssignedRequests(req, res)
);

// retrieve posted requests
router.get("/retrievePostedRequests", (req, res) =>
  retrievePostedRequests(req, res)
);

// retrieve count of all completed requests
router.get("/countRequestsByStatus", (req, res) =>
  countRequestsByStatus(req, res)
);

// retrieve a request
router.get("/retrieveRequest", (req, res) => retrieveRequest(req, res));

// delete request
router.post("/deleteRequest", (req, res) => deleteRequest(req, res));

// assign request
router.put("/assignRequestToFulfiller", (req, res) =>
  assignRequestToFulfiller(req, res)
);

// remove fulfiller from request
router.put("/removeFulfillerFromRequest", (req, res) =>
  removeFulfillerFromRequest(req, res)
);

// mark request completed
router.put("/markRequestCompleted", (req, res) =>
  markRequestCompleted(req, res)
);

// update request
router.put("/updateRequest", requestValidationRules(), validate, (req, res) =>
  updateRequest(req, res)
);

export default router;
